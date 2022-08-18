export type TransLationData =
    {
        languageId: string,
        languageName: string,
        // name: string,
        // slug: string,
        description: string,
        metaTitle: string,
        metaKeyword: string,
        metaDescription: string
    }


export type CategoryListTypes = [
    {
        _id: string,
        translationData: TransLationData[],
        status: string,
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
        categoryBanner: string,
        categoryBannerMobile: string,
        categoryIcon: string,
        categoryIconMobile: string,
        path: string
    }
]