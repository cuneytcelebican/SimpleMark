let totalMark = 0;
let markingSchema = [
    {
      "categoryTitle": "Category 1",
      "categoryDescription": "",
      "categoryMark": 10,
      "categoryTotalMark": 0,
      "categoryContent": [
        {
          "content": "asdas",
          "feedback": "",
          "given": 0,
          "total": 1
        },
        {
          "content": "sadasd",
          "feedback": "",
          "given": 0,
          "total": 9
        }
      ]
    },
    {
      "categoryTitle": "sdsadasd",
      "categoryDescription": "",
      "categoryMark": 5,
      "categoryTotalMark": 0,
      "categoryContent": [
        {
          "content": "kkk",
          "feedback": "",
          "given": 0,
          "total": 3
        },
        {
          "content": "asadas",
          "feedback": "",
          "given": 0,
          "total": 2
        }
      ]
    }
  ]

const contentWrapper = document.getElementById("contentWrapper");



function render()
{
    let markingSchemaData = document.getElementById("unique-marking-schema").innerText;
    markingSchema = JSON.parse(markingSchemaData);
    markingSchema.forEach(item =>
    {
        let container = document.createElement("div");
        container.classList.add("category-container");

        let categoryHeader = createDiv(container, ["row", "category-header"], "");

        createDiv(categoryHeader, "col-md-10", item.categoryTitle);
        createDiv(categoryHeader, ["col-md-2", "categoryMark"], item.categoryMark);

        container.append(categoryHeader);

        if(item.categoryDescription && item.categoryDescription !== "")
        {
            createDiv(container, ["col-md-12", "description"], item.categoryDescription);
        }

        let categoryContentWrapper = document.createElement("div");
        categoryContentWrapper.classList.add("col-md-12");

        item.categoryContent.forEach(categoryItem =>
        {
            let categoryContent = createDiv(categoryContentWrapper, ["row", "category-content"], "");
            createDiv(categoryContent, ["col-md-12", "content-header"], categoryItem.content);
            

            let categoryContentTextAreaWrapper = createDiv(categoryContent, "col-md-10", "");
            createTextArea(categoryContentTextAreaWrapper, "Add your feedback here!", item.categoryTitle, categoryItem.content);
            categoryContent.append(categoryContentTextAreaWrapper);
            let markInputWrapper = createDiv(categoryContent, ["col-md-2", "student-mark-container"], "");
            let disabledMark = createInput(categoryContent, ["student-mark"], categoryItem.given, false, item.categoryTitle, categoryItem.content);
            let enabledMark = createInput(categoryContent, ["student-mark", "disabled-mark"], categoryItem.total, true, item.categoryTitle, categoryItem.content);
            
            markInputWrapper.append(enabledMark);
            markInputWrapper.append(disabledMark);
            categoryContentWrapper.append(categoryContent);
            
        })
        container.append(categoryContentWrapper);


        contentWrapper.append(container);
    });

    let downloadButtonWrapper = createDiv(contentWrapper, ["col-md-12", "download-button"], "");
    let downloadButton = document.createElement("button");
    downloadButton.innerText = "Download the report";
    downloadButton.classList.add("btn", "btn-primary", "btn-block")
    downloadButton.setAttribute("data-toggle", "modal");
    downloadButton.setAttribute("data-target", "#result");
    downloadButtonWrapper.append(downloadButton);
    downloadButton.addEventListener("click", ()=>extractResult());
}

function createDiv(container, className, content)
{
    let div = document.createElement("div");
    if (typeof className === "object")
    {
        className.forEach(item =>
        {
            div.classList.add(item);
        });
    }
    else
    {
        div.classList.add(className);
    }
    div.innerHTML = content;
    container.append(div);
    return div;
}

function createTextArea(container, placeholder, categoryTitle, categoryContent)
{
    let textArea = document.createElement("textarea");
    textArea.placeholder = placeholder;
    textArea.setAttribute("category-title", categoryTitle);
    textArea.setAttribute("category-content", categoryContent);

    textArea.addEventListener("change", (ev)=>
    {
        let elem = ev.target;
        let categoryTitle = elem.getAttribute("category-title");
        let categoryContent = elem.getAttribute("category-content");
        if (categoryTitle)
        {
            let selectedCategory = markingSchema.find(item => item.categoryTitle === categoryTitle);
            let selectedContent = selectedCategory ? selectedCategory.categoryContent.find(item => item.content === categoryContent) : null;
            
            if (selectedContent)
            {
                selectedContent.feedback = elem.value;
            }
        }
    })
    container.append(textArea);
    return textArea;
}

function createInput(container, className, content, disabled, categoryTitle, categoryContent)
{
    let inputContainer = document.createElement("div");
    inputContainer.classList.add("input-wrapper");

    let input = document.createElement("input");
    input.disabled = disabled;
    input.setAttribute("category-title", categoryTitle);
    input.setAttribute("category-content", categoryContent);

    if (typeof className === "object")
    {
        className.forEach(item =>
        {
            input.classList.add(item);
        });
    }
    else
    {
        input.classList.add(className);
    }

    if (!disabled)
    {
        input.addEventListener("change", (ev)=>
        {
            let elem = ev.target;
            let mark = parseInt(elem.value);

            let categoryTitle = elem.getAttribute("category-title");
            let categoryContent = elem.getAttribute("category-content");
            let selectedCategory = markingSchema.find(item => item.categoryTitle === categoryTitle);
            let selectedContent = selectedCategory ? selectedCategory.categoryContent.find(item => item.content === categoryContent) : null;
            
            if (mark >= 0 && mark < selectedContent.total + 1)
            {
                if (categoryTitle)
                {
                    
                    selectedContent.given = mark;
                }
            }
            else {
                alert(`"${selectedContent.content}" mark must be between 0 and ${selectedContent.total}`);
                elem.value = "";
            }
        });
        
    }
    input.placeholder = content;
    
    inputContainer.append(input);
    container.append(inputContainer);
    return inputContainer;
}

function extractResult()
{
    let innerResult = "";
    let space = "   ";
    let newLine = "<br>";
    let totalGrade = 0;
    let totalGradeBase = 0;
    markingSchema.forEach(item =>
    {
        innerResult += `<b>${item.categoryTitle} `
        let totalCategoryGrade = 0;
        let categoryResult = "";
        item.categoryContent.forEach(category =>
        {
            categoryResult += (category.content !== "") ? `${space}${category.content}${newLine}` : "";
            if (category.feedback !== "")
            {
                categoryResult += `${space}TA Feedback:${newLine}`;
                categoryResult += `${space}${category.feedback}${newLine}`;
            }
            categoryResult += `${space}GRADE: ${category.given}/${category.total}${newLine}${newLine}`;
            totalCategoryGrade += category.given;
        });
        innerResult += `${totalCategoryGrade}/${item.categoryMark}${newLine}</b>`
        innerResult += `${categoryResult}`;
        totalGrade += totalCategoryGrade;
        totalGradeBase += item.categoryMark;
    });
    innerResult += `TOTAL GRADE: ${totalGrade}/${totalGradeBase}`
    
    let result = `TOTAL GRADE: ${totalGrade}/${totalGradeBase}${newLine}${newLine}`;
    result += innerResult;
    let resultDiv = document.getElementById("extractResult");
    resultDiv.innerHTML = result;
    console.log(result)
}
render();


