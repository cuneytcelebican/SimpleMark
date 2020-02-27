//-------------------- Add marking schema -------------------------
let id = 0;
const markingSchemaWrapper = document.getElementById("schema-creator");
const addButtonWrapper = document.getElementById("add-category-button");

(function render (){
    addCategoryButtonWrapper = createElement(addButtonWrapper, "div", "add-button-wrapper", "");
    createLinkWrapper = createElement(addButtonWrapper, "div", "create-link-wrapper", "");
    addCategoryButton = createElement(addCategoryButtonWrapper, "button", "btn btn-warning btn-sm custom-add-button", "Add Category");
    createLinkButton = createElement(createLinkWrapper, "button", "btn btn-danger btn-sm custom-create-link-button", "Create Link");

    addCategoryButton.addEventListener("click", () =>
    {
        createCategory();
    })

    createLinkButton.addEventListener("click", () =>
    {
        createLink();
    })
})();

function createCategory() {
    let categoryContainer = createElement(markingSchemaWrapper, "div", "category-container", "");
    let categoryHeader = createElement(categoryContainer, "div", "row category-header", "");
    
    let categoryInputWrapper = createElement(categoryHeader, "div", "col-md-11", "");
    let inputGroup = createElement(categoryInputWrapper, "div", "input-group mb-3", "");
    let inputGroupPrepend = createElement(inputGroup, "div", "input-group-prepend", "");
    let inputGroupText = createElement(inputGroupPrepend, "span", "input-group-text", "Category title");
    let formControl = createElement(inputGroup, "input", "form-control", "");
    formControl.id = "category-title";

    let categoryDeleteWrapper = createElement(categoryHeader, "div", "col-md-1", "");
    let categoryDeleteButton = createElement(categoryDeleteWrapper, "button", "close", "");
    let categoryDeleteIcon = createElement(categoryDeleteButton, "span", "close", "&times;");

    categoryDeleteWrapper.addEventListener("click", ()=>
    {
        removeElement(categoryContainer);
    })

    let categoryItemWrapper = createElement(categoryContainer, "div", "row category-content", "");
    let categoryAddButtonWrapper = createElement(categoryContainer, "div", "col-md-12 center", "");
    let categoryItemAddButton = createElement(categoryAddButtonWrapper, "button", "btn btn-primary btn-sm add-item-button", "Add Category Item");
    categoryItemAddButton.addEventListener("click", ()=>
    {
        createCategoryItem(categoryItemWrapper);
    })
}

function createCategoryItem(binder) 
{
    let categoryItemContainer = createElement(binder, "section", "container item-section", "");
    let categoryItemRow = createElement(categoryItemContainer, "div", "row", "");

    let categoryInputWrapper = createElement(categoryItemRow, "div", "col-md-9", "");
    let inputGroup = createElement(categoryInputWrapper, "div", "input-group mb-3", "");
    let inputGroupPrepend = createElement(inputGroup, "div", "input-group-prepend", "");
    let inputGroupText = createElement(inputGroupPrepend, "span", "input-group-text", "Description");
    let formControl = createElement(inputGroup, "input", "form-control", "");

    let categoryMarkWrapper = createElement(categoryItemRow, "div", "col-md-2", "");
    let inputMarkGroup = createElement(categoryMarkWrapper, "div", "input-group mb-3", "");
    let inputMarkGroupPrepend = createElement(inputMarkGroup, "div", "input-group-prepend", "");
    let inputMarkGroupText = createElement(inputMarkGroupPrepend, "span", "input-group-text", "Mark");
    let formMarkControl = createElement(inputMarkGroup, "input", "form-control", "");
    formMarkControl.type = "number"

    let categoryInputDeleteWrapper = createElement(categoryItemRow, "div", "col-md-1", "");
    let categoryInputDeleteButton = createElement(categoryInputDeleteWrapper, "button", "close", "");
    let categoryInputDeleteIcon = createElement(categoryInputDeleteButton, "span", "close", "&times;");

    categoryInputDeleteButton.addEventListener("click", ()=>
    {
        removeElement(categoryItemContainer);
    });
}

function removeElement(elem)
{
    elem.parentNode.removeChild(elem);
}

function createElement(binder, elem, className, content)
{
    let div = document.createElement(elem);
    let classList = className.split(" ");

    if (classList.length)
    {
        classList.forEach(item =>
        {
            div.classList.add(item);
        });
    }

    div.innerHTML = content;
    binder.append(div);
    return div;
}

function createLink()
{
    let categories = document.getElementsByClassName("category-container");
    let school = document.getElementById("school").value;
    let course = document.getElementById("course-code").value;
    let markingSchema = [];
    let sendToDb = true;
    if(school !== "" && course !== "")
    {
        for (let i = 0; i < categories.length; i++)
        {
            let inputs = categories[i].getElementsByClassName("form-control");
            let obj = {
                categoryTitle: "",
                categoryDescription: "",
                categoryMark: 0,
                categoryTotalMark: 0,
                categoryContent:[]
            }

            for (let j = 0; j < inputs.length; j++)
            {
                if (inputs[j].value === "" && sendToDb)
                {
                    emptyAlert("You cannot proceed with empty input");
                    sendToDb = false;
                    break;
                }
                if (j == 0)
                {
                    obj.categoryTitle = inputs[j].value;
                }
                else
                {
                    if (j % 2 != 0)
                    {
                        categoryContent = {
                            content: inputs[j].value,
                            feedback: "",
                            given: 0,
                        },
                        obj.categoryContent.push(categoryContent)
                    }
                    else
                    {
                        obj.categoryMark += parseInt(inputs[j].value)
                        obj.categoryContent[obj.categoryContent.length - 1].total = parseInt(inputs[j].value);
                    }
                }
            }
            markingSchema.push(obj);
        }
        if(markingSchema.length && sendToDb)
        {
            sendToServer(markingSchema);
        }
    }
    else
    {
        emptyAlert("School name and course code is mandotory");
    }
}
function emptyAlert(msg)
{
    alert(msg);
}
function sendToServer(message)
{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let linkWrapper = document.getElementById("extractResult");
        linkWrapper.innerText = "Your marking link is below \n" + window.location.origin + "/" + this.responseText;

        $('#result').modal('show');
      }
    });
    
    xhr.open("POST", "/add-marking-schema");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.send("message=" + JSON.stringify(message));
}

