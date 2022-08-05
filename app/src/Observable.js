export class Subscriber {
    closed = false;

    constructor(destination) {}

    next(value) {
        if (!this.closed) {
            this.destination.next?.(value);
        }
        
    }

    complete() {
        if (!this.closed) {
            this.closed = true;
            this.destination.complete?.();
        }
    }

    error(err) {
        if (!this.closed) {
            this.closed = true;
            this.destination.err?.(err);
        }
    }
}

export class Observable {
    constructor(_wrapFunction) {

    }

    subscribe(observer) {
        const subscriber = new Subscriber(observer);
        this._wrapFunction(subscriber);
    }
}

export class Subject {
    closed = false;
    subscriptions = [];

    constructor() {}

    next(value) {
        if (!this.closed) {
            this.subscriptions.forEach((observer) => {
                observer.next?.(value);
            })
        }    
    }

    complete() {
        if (!this.closed) {
            this.closed = true;
            this.subscriptions.forEach((observer) => {
                observer.complete?.();
            });
            this.subscriptions = [];
        }
    }

    error(err) {
        if (!this.closed) {
            this.closed = true;
            this.subscriptions.forEach((observer) => {
                observer.error?.(err);
            });
            this.subscriptions = [];
        }
    }

    subscribe (next, complete = () => {}, error = () => {}) {
        this.subscriptions.push({next, complete, error});
    }
}

export class BehaviorSubject extends Subject {
    value = null;

    constructor(value) {
        super();
        this.value = value;
    }

    next(value) {
        super.next(value)
        this.value = value;
    }
}