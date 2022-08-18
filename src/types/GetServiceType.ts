export type GetServiceTypeList = GetServiceType[]

export type GetServiceType = {
    addressId: string,
    averageRating: number,
    categoryId: string,
    categoryName: string,
    currency: string,
    description: string,
    fixedPrice: boolean
    forTime: string,
    path: string,
    price: number,
    remoteService: boolean,
    sellerId: string,
    serviceCover: string,
    serviceCreatedDate: string,
    serviceId: string,
    subcategoryId: string,
    subcategoryName: string,
    title: string,
    totalReview: number,
    wishlist: boolean,
    _id: string,
    sellerData: SellerDataType[],
    gallery: GalleryDataType[],
    addressData: AddressDataType[]
}


export type SellerDataType = {
    businessName: string
    firstName: string,
    lastName: string,
    phone: number,
    type: string,
    _id: string
}

export type GalleryDataType = {
    description: string,
    fileType: string,
    media: string
}

export type DaysOpenedDataType = {
    day: string,
    from: string,
    to: string
}

export type AddressDataType = {
    addressLine1: string,
    addressLine2: string,
    cityId: string,
    cityName: string,
    countryId: string,
    countryName: string,
    createdAt: string,
    daysOpened: DaysOpenedDataType[]
    postcode: string,
    stateId: string,
    stateName: string,
    _id: string,
}

