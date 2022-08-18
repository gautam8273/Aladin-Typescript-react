export type TranslationType = {
    languageId: string,
    languageName: string,
    name: string,
    slug: string,
    description: string,
    metaTitle: string,
    metaKeyword: string,
    metaDescription: string
}

export type SubCategoryType = [
    {
        _id: string,
        translationData: TranslationType[],
        status: boolean,
        deletedAt: number,
        name: string,
        slug: string,
        description: string,
        metaTitle: string,
        metaKeyword: string,
        metaDescription: string,
        categoryId: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        path: string,
        subcategoryBanner: string,
        subcategoryBannerMobile: string,
        subcategoryIcon: string,
        subcategoryIconMobile: string

    }
]
