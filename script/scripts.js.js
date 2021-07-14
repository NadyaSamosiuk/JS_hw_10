const Dom = function() {
    // создание и возврата новых элементов по имени тега
    this.create = function(name) {
        this.element = document.createElement(name);//создаем элемент
        return this.element; //возвращаем этот элемент
    };

    //добавление любого содержимого внутрь элемента или его возврата
    this.html = function(html, element) {
        element = element || this.element; //если указан элемент то берем этот элемент если нет добовляем последнему        
        element.innerHTML = html;
    };

    //добавление класса к элементу
    this.classAdd = function(name, element) {
        element = element || this.element;        
        element.classList.add(name);
    }

    //удаление класса из элемента
    this.classRemove = function(name, element) {
        element = element || this.element;        
        element.classList.remove(name);
    }

    //переключения класса в элементе
    this.classToggle = function(name, element){
        element = element || this.element;
        element.classList.toggle(name);
    }

    //для проверки существования класса в элементе (должен вернуть true или false);
    this.classHas = function(name, element){
       element = element || this.element;  
       return  element.classList.contains(name)
    }
    //добавление новых элементов внутрь какого-либо после всего его содержимого, либо перед каким-то конкретным;
    this.append = function(to, element, before) {
        element = element || this.element;

        if (!before) {
            to.appendChild(element);
        } else {
            to.insertBefore(element, before);
        }
    }
    //поиск и возврат найденных элементов внутри переданного 
    this.search = function(selector, element) {
        element = element || document;

        let result = element.querySelectorAll(selector);      
        if (result.length == 1) result = result[0];      
        return result;
    };
    
   //для добавления атрибута к элементу или возврата значения атрибута;
   this.attr = function(name, element, value){
        element = element || this.element
        element.setAttribute(name,value);
    }
    //добавления к элементу события и выполнения функции (проверьте доступность контекста this и event)
    this.on = function(name, element, funcName){
        element.addEventListener(name, funcName);
    }

};

const $ = new Dom();

console.log($);

let h1 = $.create('h1');
console.log(h1);

let p = $.create('p');
console.log(p);

$.html('Заголовок', h1);
$.html('Текстовый абзац', p);

$.classAdd('p1', p);

$.classToggle('title', h1);
console.log($.classHas('p1', p));


$.append(document.body, h1);
$.append(document.body, p);

let button = $.create('button');
$.html('Button', button);

$.append(document.body, button, p);

let p2 = $.create('p');
$.html('Еще один абзац', p2);
$.append(document.body, p2);

console.log($.search('p'));
console.log($.search('h1'));

$.attr('id', p2, 'p2');
console.log(p2)
console.log(p.classList.contains('p2'))

console.log($.classHas('p1', p));

let btn = $.search('button');
console.log(btn);

//проверка доступностьи контекста this и event
let btnColor = function(){
    this.style.backgroundColor = 'yellow'
    console.log('hello')
}

$.on('click', btn,  btnColor);


let input1 = $.create('input');
$.attr('type', input1, 'text')
$.append(document.body, input1, button);

$.append(document.body, $.create('br'), button)

let event1 = function(event){
    if(event.keyCode == '13'){                
        console.log(event.target.value)                
        event.target.value=""
    };
}

$.on('keyup', input1, event1);

