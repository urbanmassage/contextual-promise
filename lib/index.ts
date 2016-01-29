class ContextualPromise<T> extends Promise<T> {
  private context: any;
  constructor(fn) {
    super(fn);
  }

  bind(context) {
    this.context = context;
    return this;
  }
  
  then<T>(onResolve, onReject) {
    return super.then<T>(onResolve.bind(this.context), onReject.bind(this.context));
  }
  
  static resolve(): ContextualPromise<void>;
  static resolve<T>(v: T | PromiseLike<T>): ContextualPromise<T>;
  static resolve<T>(v?: T | PromiseLike<T>): ContextualPromise<T> {
    return new ContextualPromise<T>(resolve => resolve(v));
  }
}

export = ContextualPromise;
