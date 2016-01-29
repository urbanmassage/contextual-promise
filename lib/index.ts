class ContextualPromise<T> extends Promise<T> {
  context: any;

  constructor(fn) {
    super(fn);
  }
  
  bind(context) {
    this.context = context;
  }
  
  then(onResolve, onReject) {
    return super.then(onResolve.bind(this.context), onReject.bind(this.context));
  }
}

export = ContextualPromise;
