export type userGetWishListDataType = userGetWishListType[]

export type userGetWishListType = {
    _id: string,
    sellerData: SellerDataType[],
    wishlist: string,
    totalReview: number,
    averageRating: number,
    serviceId: string,
    serviceCreatedDate: string,
    sellerId: string,
    title: string,
    categoryId: string,
    subcategoryId: string,
    fixedPrice: boolean,
    price: number,
    currency: string,
    serviceCover: string,
    path: string
}


export type SellerDataType = {
    _id: string,
    firstName: string,
    lastName: string,
    phone: number,
    type: string
}

