require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentful_host = process.env.CTF_HOST || "cdn.contentful.com"

module.exports = {
  pathPrefix: `/mini-gatsbyv2-material-kit-react`,
  siteMetadata: {
    title: "Nigth of Passion",
  },
  plugins: [
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-sass",
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.REACT_APP_CTF_SPACEID,
        accessToken: process.env.REACT_APP_CTF_CDN,
        host: contentful_host,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    "gatsby-plugin-material-ui",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/assets/img/favicon.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          database: true,
          auth: true,
          storage: true,
        },
        credentials: {
          apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
          databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
          projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSSAGING_SENDERID,
          appId: process.env.REACT_APP_FIREBASE_APID,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-134177845-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        //anonymize: true,
        // Setting this parameter is also optional
        //respectDNT: true,
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        //pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        //defer: false,
        // Any additional optional fields
        //sampleRate: 5,
        //siteSpeedSampleRate: 10,
        //cookieDomain: "example.com",
      },
    },
  ],
}
