import { FC, useRef } from 'react';
import styles from './BacgroundUniverse.module.less';

export const BackgroundUniverse: FC = () => {
	const universe = useRef(null);

	// if (universe) {
	// }

	// const layerCount = 5;
	const starCount = 400;
	const maxTime = 30;

	// const universe = document.getElementById("universe");
	const w = window;
	const d = document;
	const e = d.documentElement;
	const width = w.innerWidth || e.clientWidth;
	const height = w.innerHeight || e.clientHeight;

	for (let i = 0; i < starCount; ++i) {
		const ypos = Math.round(Math.random() * height);
		const star = document.createElement('div');
		const speed = 1000 * (Math.random() * maxTime + 1);

		star.setAttribute('class', 'star' + (3 - Math.floor(speed / 1000 / 8)));
		star.style.backgroundColor = 'white';

		// universe?.appendChild(star);
		star.animate(
			[
				{ transform: 'translate3d(' + width + 'px, ' + ypos + 'px, 0)' },
				{ transform: 'translate3d(-' + Math.random() * 256 + 'px, ' + ypos + 'px, 0)' },
			],

			{
				delay: Math.random() * -speed,
				duration: speed,
				iterations: 1000,
			},
		);
	}

	// const animation = elem?.animate(
	//     {
	//         opacity: [0.5, 1],
	//         transform: ["scale(0.5)", "scale(1)"]
	//     },
	//     {
	//         direction: "alternate",
	//         duration: 500,
	//         iterations: Infinity
	//     }
	// );

	return <div ref={universe} id='universe' className={styles.universe}></div>;
};
