import aboutCommunityPlaceholder from './about/about-community-placeholder.svg'
import dashboardConnectImage from './dashboard/introducereconnect.png'
import northwayEdition2BannerPlaceholder from './events/northway-edition-2-banner-placeholder.svg'
import homeCommunityPlaceholder from './home/home-community-placeholder.svg'
import homeHeroPlaceholder from './home/home-hero-placeholder.svg'
import memberApexPlaceholder from './members/member-apex-placeholder.svg'
import memberForgedPlaceholder from './members/member-forged-placeholder.svg'
import memberMidnightPlaceholder from './members/member-midnight-placeholder.svg'
import memberYellowlinePlaceholder from './members/member-yellowline-placeholder.svg'
import galleryLightsPlaceholder from './shared/gallery-lights-placeholder.svg'
import galleryLineupPlaceholder from './shared/gallery-lineup-placeholder.svg'
import galleryNightdrivePlaceholder from './shared/gallery-nightdrive-placeholder.svg'
import galleryRunPlaceholder from './shared/gallery-run-placeholder.svg'
import imageFallback from './shared/image-fallback.svg'

export const sharedImages = {
  fallback: imageFallback,
  galleryLights: galleryLightsPlaceholder,
  galleryLineup: galleryLineupPlaceholder,
  galleryNightdrive: galleryNightdrivePlaceholder,
  galleryRun: galleryRunPlaceholder,
}

export const homeImages = {
  hero: homeHeroPlaceholder,
  community: homeCommunityPlaceholder,
  gallery: {
    run: galleryRunPlaceholder,
    lights: galleryLightsPlaceholder,
    lineup: galleryLineupPlaceholder,
    nightdrive: galleryNightdrivePlaceholder,
  },
}

export const aboutImages = {
  community: aboutCommunityPlaceholder,
}

export const dashboardImages = {
  connect: dashboardConnectImage,
}

export const eventImages = {
  northwayEdition2Banner: northwayEdition2BannerPlaceholder,
  northwayEdition1Cover: galleryRunPlaceholder,
  gallery: [galleryLightsPlaceholder, galleryNightdrivePlaceholder],
}

export const memberImages = {
  apex: memberApexPlaceholder,
  forged: memberForgedPlaceholder,
  midnight: memberMidnightPlaceholder,
  yellowline: memberYellowlinePlaceholder,
}
