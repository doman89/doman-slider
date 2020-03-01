import { default as bemCssModules } from 'bem-css-modules';
import { DomanSliderConfig } from './DomanSliderConfig';
import { default as DomanSliderStyles } from './DomanSlider.module.scss';

const styles = bemCssModules(DomanSliderStyles);

export default class DomanSlider {
	private containerElement: HTMLElement | null = null;
	private slides: Element[] = [];

	public constructor(configuration?: DomanSliderConfig) {
		const isSliderContainerExist: boolean = this.bindToWrapperElement(configuration?.containerElement);

		if (!isSliderContainerExist) {
			console.warn('There is no root element for the Doman Slider');

			return;
		}

		this.addSliderClassToWrapperElement();
		this.bindToSlides();
		this.addSlideClassToAllSlides();
		
	}

	private bindToSlides = (): void => {
		this.slides = Array.from((this.containerElement as HTMLElement).children);
		this.slides.forEach(element => element.classList.add(styles('slide')));
	}

	private bindToWrapperElement = (elementId?: string): boolean => {
		const containerElement = document.getElementById(elementId ?? 'doman-slider');

		if (!containerElement) {
			return false;
		}
		
		this.containerElement = containerElement;

		return true;
	}

	private addSliderClassToWrapperElement = (): void => this.containerElement?.classList.add(styles());

	private addSlideClassToAllSlides = (): void => this.slides.forEach(slide => slide.classList.add(styles('slide')));
}

new DomanSlider();