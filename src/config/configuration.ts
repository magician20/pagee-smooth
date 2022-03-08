export const defaultConfig = () => (
    {
        server: {
            port: Number(process.env.PORT),
        },
        jwt: {
            JWTsecret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
            refresh: process.env.JWT_REFRESH_TOKEN_EXP,
        },
        database: {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,  //only in developer state
            logging: true,
            //maxQueryExecutionTime: 1000,//log all queries which run more then 1 second.
        }
    }
);