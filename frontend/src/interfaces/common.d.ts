export interface CustomButtonProps {
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