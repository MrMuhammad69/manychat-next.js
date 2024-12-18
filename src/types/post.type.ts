export type InstagramPostProps = {
    id: string,
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM',
    media_url: string,
    caption?: string
    timestamp: Date
}