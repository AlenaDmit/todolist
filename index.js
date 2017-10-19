(function getToDoList() {
    function createElem(tagName, cssClass) {
        let newElem = document.createElement(tagName);
        newElem.setAttribute('class', cssClass);
        return newElem;
    }

    function createElemImg(src, cssClass) {
        let newImg = document.createElement('img');
        newImg.setAttribute('src', src);
        newImg.setAttribute('class', cssClass);
        return newImg;
    }

    let container = createElem('div', 'container');
    let nameOfForm = createElem('div', 'form-name');
    nameOfForm.innerHTML = 'TO DO LIST';
    let form = createElem('form', 'form');
    let formInput = createElem('input', 'form__input');
    formInput.setAttribute('placeholder','Введите название...');
    let btnAdd = createElem('a', 'form__link-btn');
    let imgAdd = createElemImg('icons/add-black.svg', 'form__link-btn__img-btn-add');
    let dataPicker = createElem('input', 'form__data');
    dataPicker.setAttribute('type', 'date');
    let filters = createElem('ul','filters');
    let filtersText = createElem('li', 'filters__text');
    filtersText.innerHTML = 'Задачи на:';
    let filterDay = createElem('li', 'filters__day');
    filterDay.innerHTML = 'день';
    let filterWeek = createElem('li', 'filters__week');
    filterWeek.innerHTML = 'неделю';
    let filterMonth = createElem('li', 'filters__month');
    filterMonth.innerHTML = 'месяц';
    let tasksList = createElem('ul', 'tasks-list');

    dataPicker.onchange = function () {
        if (dataPicker.value !== '') {
            dataPicker.classList.add('form__data--choosed');
        } else {
            dataPicker.classList.remove('form__data--choosed');
        }
    };
    
    form.appendChild(formInput);
    form.appendChild(dataPicker);
    btnAdd.appendChild(imgAdd);
    form.appendChild(btnAdd);
    filters.appendChild(filtersText);
    filters.appendChild(filterDay);
    filters.appendChild(filterWeek);
    filters.appendChild(filterMonth);
    container.appendChild(nameOfForm);
    container.appendChild(form);
    container.appendChild(filters);
    container.appendChild(tasksList);
    document.body.appendChild(container);

    imgAdd.onmouseover = function () {
        imgAdd.setAttribute('src','icons/add-green.svg');
    };

    imgAdd.onmouseout = function () {
        imgAdd.setAttribute('src', 'icons/add-black.svg');
    };

    let arrDatas = [];

    btnAdd.addEventListener('click', function (e) {
        e.preventDefault();
        if (formInput.value.length !== 0 && dataPicker.value.length !== 0) {
            let valueOfInput = formInput.value;
            let valueOfData = dataPicker.value;
            let taskItem = createElem('li', 'tasks-list__item');
            let taskCheckbox = createElem('input', 'tasks-list__item__checkbox');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.setAttribute('hidden', 'true');
            taskCheckbox.setAttribute('id', 'checkbox');
            let taskName = createElem('label', 'tasks-list__item__name');
            taskName.setAttribute('for', 'checkbox');
            taskName.innerHTML = valueOfInput;
            let taskDeadline = createElem('span', 'tasks-list__item__deadline');
            taskDeadline.innerHTML = valueOfData;
            let btnDeleteTask = createElem('a', 'tasks-list__item__link-btn');
            let imgDeleteTask = createElemImg('icons/delete-black.svg', 'tasks-list__item__link-btn__img-btn-delete');

            taskItem.appendChild(taskCheckbox);
            taskItem.appendChild(taskName);
            taskItem.appendChild(taskDeadline);
            btnDeleteTask.appendChild(imgDeleteTask);
            taskItem.appendChild(btnDeleteTask);
            tasksList.appendChild(taskItem);

            imgDeleteTask.onmouseover = function(e) {
                e.stopPropagation();
                imgDeleteTask.setAttribute('src', 'icons/delete-red.svg');
            };

            imgDeleteTask.onmouseout = function(e) {
                e.stopPropagation();
                imgDeleteTask.setAttribute('src', 'icons/delete-black.svg');
            };

            imgDeleteTask.addEventListener('click', function (e) {
                e.stopPropagation();
                let target = e.target.parentNode.parentNode;
                tasksList.removeChild(target);
            });


            arrDatas.push(valueOfData);

            filterDay.addEventListener('click', function (e) {
                for (let i = 0; i < valueOfData.length; i++) {
                    console.log(typeof valueOfData[i]);
                }
            })
        }

    })

})();