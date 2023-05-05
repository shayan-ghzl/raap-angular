import { Injectable } from '@angular/core';
import { openDB, deleteDB } from 'idb';
import { Good, IBrandDto, IGoodGroupDto } from '../models/basket';

interface MyDBTables {
  products: Good[];
  brands: IBrandDto[];
  categories: IGoodGroupDto[];
}
type TableName = keyof MyDBTables;

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private databaseName = "raap-yadak";
  private version = 1;
  private dbConnectionPromise = openDB<MyDBTables>(this.databaseName, this.version, {
    upgrade(db) {
      console.log('%cIndexedDB upgrade', 'font-weight:bold;font-size:1rem;color:blue;');
      // keyPath: "id" is like primary key - we will retrieve items with it - it is unique
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore("products", { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('brands')) {
        db.createObjectStore("brands", { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore("categories", { keyPath: 'id' });
      }
    },
    blocked(currentVersion, blockedVersion, event) {
      console.log('%cIndexedDB blocked', 'font-weight:bold;font-size:1rem;color:blue;');
    },
    blocking(currentVersion, blockedVersion, event) {
      console.log('%cIndexedDB blocking', 'font-weight:bold;font-size:1rem;color:blue;');
    },
    terminated() {
      console.log('%cIndexedDB terminated', 'font-weight:bold;font-size:1rem;color:blue;');
    }
  });

  async addItem<T extends { id: number | string }>(target: TableName, value: T) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, "readwrite");
      tx.store.getAll().then((items) => {
        items = items.map(p => p.id);
        if (items.includes(value['id'])) {
          console.log('the item exists in the database');
        } else {
          tx.store.add({ ...value })
            .then(v => {
              console.log(`${target} added`, v);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    });
  }

  async addItems<T extends { id: number | string }>(target: TableName, value: T[]) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, "readwrite");
      tx.store.getAll().then((items) => {
        items = items.map(p => p.id);
        value.forEach((item) => {
          if (items.includes(item['id'])) {
            console.log('the item exists in the database');
          } else {
            tx.store.add({ ...item })
              .then(v => {
                console.log(`${target} added`, v);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      });
    });
  }

  async getItem<T>(target: TableName, id: string | number) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, "readonly");
      return tx.store.get(id);
    });
  }

  async getItems<T>(target: TableName) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, "readonly");
      return tx.store.getAll();
    });
  }

  async deleteItem(target: TableName, id: string | number) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, "readwrite");
      tx.store.delete(id);
      return tx.done;
    });
  }

  async deleteItems(target: TableName, ids: (string | number)[]) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, "readwrite");
      Promise.all(ids.map(p => tx.store.delete(p)));
      return tx.done;
    });
  }

  deleteDB() {
    deleteDB(this.databaseName, {
      blocked() {
        console.log("deleteDB blocked");
      }
    });
  }

  async checkOfflineReady() {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction('Status', 'readonly');
      return tx.store.getAll("concrete-record-sheets");
    });
  }

  async emptyTable(target: TableName) {
    return this.dbConnectionPromise.then((db) => {
      const tx = db.transaction(target, 'readwrite');
      tx.store.clear();
      return tx.done;
    });
  }

}
