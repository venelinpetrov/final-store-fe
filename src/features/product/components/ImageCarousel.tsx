import {
    Carousel,
    AspectRatio,
    Box,
    Image,
    type IconButtonProps,
    IconButton,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

interface ImageCarouselProps {
    items: Array<{ src: string; alt: string }>;
    page?: number;
    onPageChange?: ((page: number) => void) | undefined;
}

export const ImageCarousel = ({ items, page, onPageChange }: ImageCarouselProps) => {
    return (
        <Carousel.Root
            page={page}
            onPageChange={(e) => onPageChange?.(e.page)}
            slideCount={items.length}
            maxW="2xl"
            position="relative"
            colorPalette="white"
            allowMouseDrag
        >
            <Carousel.Control width="full" position="relative">
                <Carousel.PrevTrigger asChild>
                    <ActionButton insetStart="4">
                        <LuArrowLeft />
                    </ActionButton>
                </Carousel.PrevTrigger>

                <Carousel.ItemGroup width="full">
                    {items.map(({ src, alt }, index) => (
                        <Carousel.Item key={index} index={index}>
                            <AspectRatio ratio={16 / 9} maxH="72vh" w="full">
                                <Image src={src} alt={alt} objectFit="contain" />
                            </AspectRatio>
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>

                <Carousel.NextTrigger asChild>
                    <ActionButton insetEnd="4">
                        <LuArrowRight />
                    </ActionButton>
                </Carousel.NextTrigger>

                <Box position="absolute" bottom="6" width="full">
                    <Carousel.Indicators
                        transition="width 0.2s ease-in-out"
                        transformOrigin="center"
                        opacity="0.5"
                        boxSize="2"
                        _current={{ width: '10', bg: 'colorPalette.subtle', opacity: 1 }}
                    />
                </Box>
            </Carousel.Control>
        </Carousel.Root>
    );
};

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    function ActionButton(props, ref) {
        return (
            <IconButton
                {...props}
                ref={ref}
                size="xs"
                variant="outline"
                rounded="full"
                position="absolute"
                zIndex="1"
                bg="bg"
            />
        );
    },
);
