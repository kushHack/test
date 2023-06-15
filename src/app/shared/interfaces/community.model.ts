export interface AddCommunity {
    communityId: string,
    communityName: string,
    fund: string,
    region: string,
    units: number,
    sqft: number,
    texas_community: boolean,
    rpm: string,
    isActive: boolean,
}

export interface UpdateCommunity {
    id: string,
    communityId: string,
    communityName: string,
    fund: string,
    region: string,
    units: number,
    sqft: number,
    texas_community: boolean,
    rpm: string,
    isActive: boolean,
}

export interface ICommunityForm {
    control_name: string,
    label: string,
    type: string,
    pattern?: string,
    options?: ICommunityFormOptions[]
    required?: boolean,
    value?: string
}
export interface ICommunityFormOptions {
    value: string | boolean,
    viewValue: string
}


export interface ICommunity {
    communityId: string,
    communityName: string,
    createdAt: string,
    fund: string,
    index: number,
    isActive: number,
    region: string,
    rpmEmail: string,
    sqft: number,
    texas_community: boolean,
    units: number,
    updatedAt: string,
    __v: number,
    _id: string,
}

export interface IRpm {
    name: string,
    email: string,
    role: string,
}