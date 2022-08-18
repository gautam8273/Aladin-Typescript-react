export type Translation = {
    languageId: string,
    languageName: string,
    name: string,
    slug: string,
    description: string,
    metaTitle: string,
    metaKeyword: string,
    metaDescription: string,
};

export type categoryList = {
    _id: string,
    translationData: Translation[],
    status: boolean,
    deletedAt: number,
    name: string,
    slug: string,
    description: string,
    metaTitle: string,
    metaKeyword: string,
    metaDescription: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    categoryIcon: string
};

export type BannerData = {
    _id: string,
    webImage: string,
    addedBy: string,
    isApproved: boolean,
    status: boolean,
    deletedAt: number,
    createdAt: string,
    updatedAt: string,
    __v: 0
};

export type TopAdvertiserBannerData = {
    _id: string,
    isApproved: boolean,
    status: boolean,
    deletedAt: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    alt: string,
    addedBy: string,
    userId: string,
    webImage: string,
    __v: number
}

export type BottomAdvertiserBannerData = {
    _id: string,
    isApproved: boolean,
    status: boolean,
    deletedAt: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    alt: string,
    addedBy: string,
    userId: string,
    webImage: string,
    __v: number
}

export type HomePageType = {
    categoryData: categoryList[],
    subcategoryData: categoryList[],
    bannerData: BannerData[],
    topAdvertiserBannerData: TopAdvertiserBannerData[],
    bottomAdvertiserBannerData: BottomAdvertiserBannerData[],
    categoryImagePath: string,
    subcategoryImagePath: string,
    bannerImagePath: string
}