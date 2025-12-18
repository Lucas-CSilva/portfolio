export const env = {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

    nodeEnv: process.env.NODE_ENV || 'development',

    features: {
        enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        enableComments: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',
    },
} as const;
