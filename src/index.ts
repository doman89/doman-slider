import { IDomanSliderConfig } from './IDomanSliderConfig';

export default class DomanSlider {
	private containerElement: HTMLElement | null = null;

	public constructor(configuration?: IDomanSliderConfig) {
		const isSliderContainerExist: boolean = this.bindToWrapperElement(configuration?.containerElement);

		if (!isSliderContainerExist) {
			console.warn('There is no root element for the Doman Slider');

			return;
		}


	}

	private bindToWrapperElement = (elementId?: string): boolean => {
		const containerElement = document.getElementById(elementId ?? 'doman-slider');

		if (!containerElement) {
			return false;
		}
		
		this.containerElement = containerElement;

		return true;
	}
}

const SliderInstance = new DomanSlider({} as IDomanSliderConfig);