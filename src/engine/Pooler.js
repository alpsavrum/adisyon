import { modulate, monetize } from '../libs/StringUtils';

const segmentation = {
  mainCourse: {
    segmentInclude: ['burger', 'kebap', 'tas firin', 'makarna', 'balik', 'wrap', 'fajita', 'pide', 'izgara', 'et', 'noodle', 'quesadilla', 'durum', 'tavuk', 'pilav']
  },
  appetizers: {
    segmentInclude: ['baslangic', 'meze', 'yan lezzet', 'aperatif', 'aparatif'],
    notInclude: ['corba', 'krep', 'citir', 'kizartma']
  },
  midhot: {
    segmentInclude: ['baslangic', 'meze', 'yan lezzet', 'aperatif', 'aparatif'],
    nameInclude: ['citir', 'kizartma', 'borek'],
    allInclude : ['ara sicak']
  },
  salads: {
    segmentInclude: ['salata']
  },
  desserts: {
    segmentInclude: ['tatli']
  },
  starts: {
    segmentInclude: ['baslangic'],
    nameInclude: ['corba', 'krep'],
  },
  drink: {
    segmentInclude: ['icecekler'],
    notInclude: ['raki', 'sarap'],
  }
}

let pool = {
  mainCourse: [],
  starts: [],
  salads: [],
  appetizers: [],
  desserts: [],
  midhot: [],
  drink: [],
}

const poolMenu = (menu = []) => {
  menu.map(segment => {
    //Main Course
    segmentation.mainCourse.segmentInclude.some(key => {
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        Number.isInteger(monetize(price)) && pool.mainCourse.push({name, price: monetize(price)}))
    });
    // Salads
    segmentation.salads.segmentInclude.some(key => {
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        Number.isInteger(monetize(price)) && pool.salads.push({name, price: monetize(price)}))
    });
    // Desserts
    segmentation.desserts.segmentInclude.some(key => {
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        Number.isInteger(monetize(price)) && pool.desserts.push({name, price: monetize(price)}))
    });
    // Starts
    segmentation.starts.segmentInclude.some(key => 
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        segmentation.starts.nameInclude.some(key => 
          modulate(name).includes(key)) && Number.isInteger(monetize(price)) && pool.starts.push({name, price: monetize(price)})));
    // Appetizers
    segmentation.appetizers.segmentInclude.some(key => 
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        segmentation.appetizers.notInclude.some(key => 
          modulate(name).includes(key) && Number.isInteger(monetize(price))) ? null : pool.appetizers.push({name, price: monetize(price)})));
    // Midhots
    segmentation.midhot.segmentInclude.some(key => 
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        segmentation.midhot.nameInclude.some(key => 
          modulate(name).includes(key)) && pool.midhot.push({name, price: monetize(price)})));
    segmentation.midhot.allInclude.some(key => 
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        Number.isInteger(monetize(price)) && pool.midhot.push({name, price: monetize(price)})));
    // Drinks
    segmentation.drink.segmentInclude.some(key => 
      modulate(segment.name).includes(key) && segment.menuItems.map(({name, price}) => 
        segmentation.drink.notInclude.some(key => 
          modulate(name).includes(key)) ? null : pool.drink.push({name, price: monetize(price)})));
  })
  return pool;
}
 export { poolMenu };