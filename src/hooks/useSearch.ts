import { MutableRefObject, useEffect, useRef } from 'react';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';

export const useSearch = (
	ref: MutableRefObject<Element>,
	eventName: string,
	action$: (event$: Observable<Event>) => Observable<Event>,
) => {
	const action = useRef(action$);

	useEffect(() => {
		let subscription: Subscription | null = new Subscription();
		let subject: Subject<Event> | null = null;

		if (ref.current) {
			subject = new Subject<Event>();
			subscription.add(action.current(subject.asObservable()).subscribe());

			subscription.add(fromEvent(ref.current, eventName).subscribe(subject));
		}

		return () => {
			subscription?.unsubscribe();
			subscription = null;
			subject = null;
		};
	}, [eventName, ref]);
};

// https://stackblitz.com/edit/react-from-event
