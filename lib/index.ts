// Native promises are not subclassable unfortunately
import {Promise} from 'es6-promise';

class ContextualPromise<T, C> extends Promise<T> {
  private context: C;
  constructor(executor: (resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void) => void, context?: C) {
    super(executor && executor.bind(context));
    this.context = context;
  }

  bind<C>(context: C) {
    return new ContextualPromise<T, C>((resolve, reject) => {
      this.then(resolve, reject);
    }, context);
  }

  then<U>(onResolve?: (value: T) => U | Thenable<U>, onReject?: (error: any) => U | Thenable<U>): ContextualPromise<U, C>;
  then<U>(onResolve?: (value: T) => U | Thenable<U>, onReject?: (error: any) => void): ContextualPromise<U, C>;

  then<U>(onResolve?, onReject?): ContextualPromise<U, C> {
    return new ContextualPromise((resolve, reject) => {
      super
        .then<T>(onResolve && onResolve.bind(this.context), onReject && onReject.bind(this.context))
        .then(resolve, reject);
    }, this.context);
  }

  catch<U>(onReject?: (error: any) => U | Thenable<U>): ContextualPromise<U, C> {
    return this.then(null, onReject);
  }

  static resolve(): ContextualPromise<void, void>;
  static resolve<T>(v: T | Thenable<T>): ContextualPromise<T, void>;
  static resolve<T, C>(v: T | Thenable<T>, ctx: C): ContextualPromise<T, C>;
  static resolve<T, C>(v?: T | Thenable<T>, ctx?: C): ContextualPromise<T, C> {
    return new ContextualPromise<T, C>(resolve => resolve(v), ctx);
  }

  static reject(): ContextualPromise<void, void>;
  static reject<T>(v: T | Thenable<T>): ContextualPromise<T, void>;
  static reject<T, C>(v: T | Thenable<T>, ctx: C): ContextualPromise<T, C>;
  static reject<T, C>(v?: T | Thenable<T>, ctx?: C): ContextualPromise<T, C> {
    return new ContextualPromise<T, C>((resolve, reject) => reject(v), ctx);
  }
  
  static all<T>(values: Array<T | Thenable<T>>): ContextualPromise<T[], void>;
  static all<T, C>(values: Array<T | Thenable<T>>, context: C): ContextualPromise<T[], C>;
  static all<T, C>(values: Array<T | Thenable<T>>, context?: C): ContextualPromise<T[], C> {
    return ContextualPromise.resolve(null, context)
      .then<T[]>(() => Promise.all(values));
  }

  static race<T>(values: Array<T | Thenable<T>>): ContextualPromise<T, void>;
  static race<T, C>(values: Array<T | Thenable<T>>, context: C): ContextualPromise<T, C>;
  static race<T, C>(values: Array<T | Thenable<T>>, context?: C): ContextualPromise<T, C> {
    return ContextualPromise.resolve(null, context)
      .then<T>(() => Promise.race(values));
  }
}

export = ContextualPromise;
