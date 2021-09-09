// * Storage Controller
const StorageCtrl = (function() {
  // ! Public methods
  return {
    storeItem: function(item) {
      let items = StorageCtrl.getItemsFromStorage()
      
      // Push new item
      items.push(item)
      // Set LS
      localStorage.setItem('items', JSON.stringify(items))
    },
    updateItemStorage: function(updatedItem) {
      let items = StorageCtrl.getItemsFromStorage()

      items.forEach(function(item, idx) {
        if(item.id === updatedItem.id) {
          // ? Method 1
          // storageItem.name = item.name
          // storageItem.calories = item.calories
          // ? Method 2
          items.splice(idx, 1, updatedItem)
        }
      })

      // Set LS
      localStorage.setItem('items', JSON.stringify(items))
    },
    deleteItemStorage: function(id) {
      let items = StorageCtrl.getItemsFromStorage()

      items.forEach(function(item, idx) {
        if (item.id === id) {
          items.splice(idx, 1)
        }
      })

      // Set LS
      localStorage.setItem('items', JSON.stringify(items))
      // ! Update LS item id
      StorageCtrl.updateItemIndex()
    },
    removeItemsFromStorage: function() {
      localStorage.removeItem('items')
    },
    getItemsFromStorage: function() {
      let items
      return items = localStorage.getItem('items') === null ? [] : JSON.parse(localStorage.getItem('items'))
    },
    updateItemIndex: function() {
      // ! forEach 不能保证遍历的顺序
      if (localStorage.getItem('items') !== null) {
        let items = JSON.parse(localStorage.getItem('items'))
        for (let idx = 0; idx < items.length; idx++) {
          items[idx].id = idx
        }
        localStorage.setItem('items', JSON.stringify(items))
        console.log(items)
      }

    }
  }
})()



// * Item Controller
const ItemCtrl = (function() {
  // ? Item Constructor
  const Item = function(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }

  // ? Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),   // Read from LS directly
    currentItem: null,  // for the purpose of updating items
    totalCalories: 0
  }

  // ! Public Methods
  return {
    getItems: function() {
      return data.items
    },
    addItem: function(name, calories) {
      // ? Create ID
      let ID = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0
      // ? Convert calories to number
      calories = parseInt(calories)
      // ? Push the item to data structure
      const newItem = new Item(ID, name, calories)
      data.items.push(newItem)

      return newItem
    },
    getItemByID: function(id) {
      let found = null
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item
        }
      })
      return found
    },
    setCurrentItem: function(item) {
      data.currentItem = item
    },
    getCurrentItem: function() {
      return data.currentItem
    },
    updateItem: function(name, calories) {
      calories = parseInt(calories)
      
      let found = null
      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name
          item.calories = calories
          found = item
        }
      })

      return found
    },
    deleteItem: function(id) {
      data.items.forEach(function(item, idx) {
        if (item.id === id) {
          data.items.splice(idx, 1)
        }
      })
    },
    clearAllItems: function() {
      data.items.splice(0, data.items.length)
    },
    getTotalCalories: function() {
      let total = 0
      if (data.items.length !== 0) {
        data.items.forEach(function(item) {
          total += item.calories
        })
      }
      // Set total cal in data structure
      data.totalCalories = total

      return data.totalCalories
    },
    logData: function() {
      return data
    }
  }
})()



// * UI Controller
const UICtrl = (function() {
  // ! Manage all the script vars in one place in case of modification in the future
  const UISelectors = {
    itemList: '#item-list', 
    listItems: '#item-list li',
    addBtn: '.add-btn', 
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn', 
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name', 
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  // ! Public Methods
  return {
    populateItems: function(items) {
      items.forEach(function(item) {
        UICtrl.addListItem(item)
      })
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      // ? Show the list
      // ! Or the item list would keep hidden
      document.querySelector(UISelectors.itemList).style.display = 'block'

      const li = document.createElement('li')
        li.className = 'collection-item'
        li.id = `item-${item.id}`
        li.innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        `
        document.querySelector(UISelectors.itemList).appendChild(li)
      
      // Clear Fields
      UICtrl.clearInput()
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems)

      // Turn Node list into array
      listItems = Array.from(listItems)

      listItems.forEach(function(listItem) {
        const itemID = listItem.id
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          `
        }
      })
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`
      document.querySelector(itemID).remove()
      UICtrl.updateListItemIndex()
    },
    removeItems: function() {
      const itemsList = Array.from(document.querySelectorAll(UISelectors.listItems))

      itemsList.forEach(function(item) {
        item.remove()
      })

      UICtrl.hideList()
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
      UICtrl.showEditState()
    },
    updateListItemIndex: function() {
      const itemList = Array.from(document.querySelector(UISelectors.itemList))

      for (let idx = 0; idx < itemList.length; idx++) {
        itemList[idx].id = `item-${idx}`
      }
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
    },
    clearEditState: function() {
      UICtrl.clearInput()
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'
    },
    getSelectors: function() {
      return UISelectors
    }
  }
})()



// * App Controller
const App = (function(StorageCtrl, ItemCtrl, UICtrl) {
  // ? Load event listeners
  // Manage all the events over here
  const loadEventListeners = function() {
    // ? Get UI Selectors
    const UISelectors = UICtrl.getSelectors()

    // ? Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    // ? Edit item event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditSubmit)

    // ? Disable submit on Enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13 || e.code === 'Enter') {
        e.preventDefault()
        return false
      }
    })

    // ? Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)

    // ? Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)

    // ? Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState)

    // ? Clear all event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsSubmit)
  }

  // ? Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UICtrl
    const input = UICtrl.getItemInput()

    // Check for name and Calories input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      // Add item to UI list
      UICtrl.addListItem(newItem)

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()
      // Display total calories in UI
      UICtrl.showTotalCalories(totalCalories)

      // Store in LS
      StorageCtrl.storeItem(newItem)
    }

    e.preventDefault()
  }

  // ? Edit item submit
  const itemEditSubmit = function(e) {
    if (e.target.classList.contains('edit-item')) {
      const itemEle = e.target.parentElement.parentElement
      const itemID = parseInt(itemEle.id.split('-')[1])
      const itemToEdit = ItemCtrl.getItemByID(itemID)

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit)
      // Add item to form
      UICtrl.addItemToForm()
    }

    e.preventDefault()
  }

  // ? Update item submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput()
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
    // Update UI
    UICtrl.updateListItem(updatedItem)
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()
    // Display total calories in UI
    UICtrl.showTotalCalories(totalCalories)

    // ! Update LS
    StorageCtrl.updateItemStorage(updatedItem)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  // ? Delete item submit
  const itemDeleteSubmit = function(e) {
    const itemID = ItemCtrl.getCurrentItem().id
    // Delete item from data structure
    ItemCtrl.deleteItem(itemID)
    // Delete item from UI
    UICtrl.deleteListItem(itemID)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()
    // Display total calories in UI
    UICtrl.showTotalCalories(totalCalories)

    // ! Delete from LS
    StorageCtrl.deleteItemStorage(itemID)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  // ? Clear all items submit
  const clearAllItemsSubmit = function(e) {
    ItemCtrl.clearAllItems()
    UICtrl.removeItems()

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()
    // Display total calories in UI
    UICtrl.showTotalCalories(totalCalories)

    // ! Clear items from LS
    StorageCtrl.removeItemsFromStorage()

    e.preventDefault()
  }


  // ! Public Methods
  return {
    // Provide needed stuffs once the app loads
    init: function() {
      // ? Clear edit state / set initial set
      UICtrl.clearEditState()

      // ? Fetch items from data structure
      const items = ItemCtrl.getItems()

      // ? Check if any items
      if (items.length === 0) {
        UICtrl.hideList()
      } else {
        // ? Populate list with items
        UICtrl.populateItems(items)
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories()
        // Display total calories in UI
        UICtrl.showTotalCalories(totalCalories)
      }

      // ? Load event listeners
      loadEventListeners()
    }
  }
})(StorageCtrl, ItemCtrl, UICtrl)

// Initialize App
App.init()
