import { default as bemCssModules } from 'bem-css-modules';
import { DomanSliderConfig } from './DomanSliderConfig';
import { default as DomanSliderStyles } from './DomanSlider.module.scss';

const styles = bemCssModules(DomanSliderStyles);

export default class DomanSlider {
	private rowsSlides: Element[][] = [];
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
		this.createRowsSlides(configuration?.numberOfRowsSlides);
		this.appendRowsSlidesToDOM();
		
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

	private createRowsSlides = (numberOfRows: number = 1) => {
		const chunkedArray: Element[][] = [];

		for(let counter = 0; counter < numberOfRows; counter++) {
			chunkedArray.push([]);
		}

		this.slides.forEach(
			(slide, index) => {
				console.log(index % numberOfRows);
				
				chunkedArray[index % numberOfRows].push(slide);
			},
			chunkedArray
		);

		this.rowsSlides = chunkedArray;
	}

	private appendRowsSlidesToDOM = () => {
		this.rowsSlides.forEach((row) => {
			const rowWrapperElement = document.createElement('div');

			rowWrapperElement.classList.add(styles('row-wrapper'));
			row.forEach((slide) => {
				rowWrapperElement.append(slide);
			}, rowWrapperElement);

			this.containerElement?.append(rowWrapperElement);
		})
	}

	private addSliderClassToWrapperElement = (): void => this.containerElement?.classList.add(styles());

	private addSlideClassToAllSlides = (): void => this.slides.forEach(slide => slide.classList.add(styles('slide')));
}


// below code is only for development, and shouldn't to be merge to master branch
const SliderConfig: DomanSliderConfig = {
	containerElement: 'test',
	numberOfRowsSlides: 3,
};

new DomanSlider(SliderConfig);