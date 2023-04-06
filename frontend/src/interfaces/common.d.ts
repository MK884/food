export interface CustomButtonProps {
    variant?: string,
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    borderRadius?: string,
    handleClick?: () => void
}

export interface CustomCarouselProps{
    images: Array,
    direction?: string,
}
export interface ButtonBasesProps{
    title: string,
    url: any,
}

export interface CustomCardProps {
    id?: BaseKey | undefined,
    title: string,
    price: string,
    discount: string,
    photo: any,
  }

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}

export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    images: IFile[];
    createdAt: string;
    price: number;
    category: ICategory;
    stock: number;
    discount: number;
}

export interface IProfile {
    id: number;
    name: string;
    address: string;
    mail: string;
    phone: number;
    gender: string;
    image: IFile[];
}