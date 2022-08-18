

export type CountryListType = {
    data: CountryData[]
}
export type LanguageType = {
    0: string,
    1: string,
    2: string,
}
export type CountryData = {
    capital: string,
    continent: string,
    createdAt: string,
    currency: string,
    deletedAt: number
    emoji: string,
    emojiU: string,
    languages: LanguageType[],
    name: string,
    native: string,
    phone: number
    shortName: string,
    status: boolean,
    updatedAt: string,
    __v: 0
    _id: string,
}