export type OtherServiceDataType = OtherServiceFromSameSellerType[]

export type OtherServiceFromSameSellerType = {
    _id: string,
    sellerId: string,
    title: string,
    categoryId: string,
    subcategoryId: string,
    fixedPrice: boolean,
    forTime: string,
    description: string,
    remoteService: boolean,
    addressId: string,
    gallery: GalleryDataType[],
    serviceCover: string,
    sellerData: SellerDataType[],
    addressData: AddressDataType[],
    wishlist: boolean,
    totalReview: number,
    averageRating: number,
    serviceId: string,
    serviceCreatedDate: string,
    currency: string,
    minPrice: number,
    maxPrice: number,
    path: string,
    categoryName: string,
    subcategoryName: string,
    price: string
}

export type GalleryDataType = {
    description: string,
    media: string,
    fileType: string
}

export type SellerDataType = {
    _id: string,
    firstName: string,
    lastName: string,
    phone: number,
    type: string,
    businessName: string,
    primaryContactPerson: string
}

export type AddressDataType = {
    _id: string,
    daysOpened: DaysOpenedDataType[],
    addressLine1: string,
    addressLine2: string,
    stateId: string,
    countryId: string,
    postcode: string,
    cityId?: string,
    createdAt: string,
    cityName?: string,
    stateName: string,
    countryName: string
}

export type DaysOpenedDataType = {
    day: string,
    from: string,
    to: string
}


