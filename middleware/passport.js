const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL_ONRENDER,
  // BASE_URL_LOCAL,
} = process.env;

// обьект параметров
const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL_ONRENDER}/auth/google/callback`,
  // callbackURL: `${BASE_URL_LOCAL}/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    // google возвращает инфо при юзера (имя и имейл)
    const { email, displayName } = profile;

    // если в БД уже есть юзер с таким gmail - (юзер хочет залогиниться) выдаем токен
    // если нет - юзер должен зарегистрироваться
    const user = await User.findOne({ email });

    // если юзер с таким gmail есть в БД
    if (user) {
      return done(null, user); // этого юзера записывает в req.user (req.user = user)
    }

    // если юзера с таким gmail нет в БД - его нужно зарегиcтрировать через google (добавить его в БД)
    // создаем для юзера пароль (юзер не будет его использовать никогда)
    const hashedPassword = await bcrypt.hash(uuid.v4(), 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: displayName,
    });

      // если юзер регистрируется через google, он сразу и логиниться через него (передаем управление дальше)
      done(null, newUser);
  } catch (error) {
      done(error, false);
  }
};

// гугл-стратегия (то, что должен выполнять passport)
const googleStrategy = new Strategy(googleParams, googleCallback);

// добавляем стратегию в passport  (если авторизация через гугл - по это это стратегии)
passport.use("google", googleStrategy);

module.exports = passport;
