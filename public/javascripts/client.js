let totalMark = 0;
let markingSchema = [
    {
        categoryTitle: "Initial Page Load",
        categoryDescription: "",
        categoryMark: 10,
        categoryTotalMark: 0,
        categoryContent: [
            {
                content: "Page contains drop-down list or other method of selecting restaurant",
                feedback: "",
                total: 3,
                given: 0,
            },
            {
                content: "Contents of drop-down list are dynamically created from available data",
                feedback: "",
                total: 7,
                given: 0,
            },
        ]
    },
    {
        categoryTitle: "When a Restaurant is Selected",
        categoryDescription: "",
        categoryMark: 20,
        categoryTotalMark: 0,
        categoryContent: [
            {
                content: "Confirmation prompt is shown if order exists",
                feedback: "",
                total: 1,
                given: 0,
            },
            {
                content: "Nothing changes on page if user selects cancel from confirmation prompt",
                feedback: "",
                total: 2,
                given: 0,
            },
            {
                content: "New menu is shown on page when change is confirmed, or if there is no current order",
                feedback: "",
                total: 3,
                given: 0,
            },
            {
                content: "All information from previous restaurant is removed",
                feedback: "",
                total: 2,
                given: 0,
            },
            {
                content: "Order information is reset, if it existed",
                feedback: "",
                total: 2,
                given: 0,
            },
            {
                content: "Restaurant's name, minimum order, and delivery fee are displayed near top of page",
                feedback: "",
                total: 4,
                given: 0,
            },
            {
                content: "Page has proper three-column format for categories, menu, and order summary",
                feedback: "",
                total: 6,
                given: 0,
            },
        ]
    },
    {
        categoryTitle: "Menu Requirements",
        categoryDescription: "",
        categoryMark: 20,
        categoryTotalMark: 0,
        categoryContent: [
            {
                content: "Categories are clearly distinct",
                feedback: "",
                total: 3,
                given: 0,
            },
            {
                content: "Items are clearly distinct",
                feedback: "",
                total: 3,
                given: 0,
            },
            {
                content: "Items show all item information (name, description, price)",
                feedback: "",
                total: 3,
                given: 0,
            },
            {
                content: "Add element is provided next to each item",
                feedback: "",
                total: 3,
                given: 0,
            },
            {
                content: "Add element increases quantity of correct item in order when clicked",
                feedback: "",
                total: 5,
                given: 0,
            },
            {
                content: "All dollar values rounded to two decimal places",
                feedback: "",
                total: 3,
                given: 0,
            },
        ]
    },
    {
        categoryTitle: "Order Summary Requirements",
        categoryDescription: "",
        categoryMark: 30,
        categoryTotalMark: 0,
        categoryContent: [
            {
                content: "Each item currently in the order is included",
                feedback: "",
                total: 2,
                given: 0,
            },
            {
                content: "Each item shows its name, number of units in the order, and total price",
                feedback: "",
                total: 2,
                given: 0,
            },
            {
                content: "Remove element is provided next to each item",
                feedback: "",
                total: 2,
                given: 0,
            },
            {
                content: "Clicking remove element decreases quantity of correct item in order",
                feedback: "",
                total: 6,
                given: 0,
            },
            {
                content: "Decreasing an item's quantity to 0 removes it from the summary",
                feedback: "",
                total: 4,
                given: 0,
            },
            {
                content: "Subtotal, tax, delivery fee, and total are calculated correctly and displayed",
                feedback: "",
                total: 4,
                given: 0,
            },
            {
                content: "Order button/element is displayed/hidden in correct cases",
                feedback: "",
                total: 4,
                given: 0,
            },
            {
                content: "'Add $X more to order' message is calculated and displayed in correct cases",
                feedback: "",
                total: 4,
                given: 0,
            },
            {
                content: "All dollar values rounded to two decimal places",
                feedback: "",
                total: 2,
                given: 0,
            },
        ]
    },
    {
        categoryTitle: "Overall Page Quality",
        categoryDescription: "These marks will be allocated for the overall quality of your page's implementation. This will include factors such as the visual appeal of your page, as well as the responsiveness of your page to user actions and changes. For example, how does your page react to the changing of the browser dimensions? Is information easy to find on your page? Is everything on the page formatted in a clear way? If you struggle to make visually appealing pages, you can focus on adding behavioural elements to your page (e.g., aligning the categories and order summary with the current location in the menu).",
        categoryMark: 10,
        categoryTotalMark: 0,
        categoryContent: [
            {
                content: "",
                feedback: "",
                total: 10,
                given: 0,
            },
        ]
    },
    {
        categoryTitle: "Code Quality and Documentation",
        categoryDescription: "Your code should be well-written and easy to understand. This includes providing clear documentation explaining the purpose and function of pieces of your code. You should use good variable/function names that make your code easier to read. You should do your best to avoid unnecessary computation and ensure that your code runs smoothly throughout operation. You should also include a README.txt file that explains any design decisions that you made, as well as any additional instructions that may be helpful to the TA.",
        categoryMark: 10,
        categoryTotalMark: 0,
        categoryContent: [
            {
                content: "",
                feedback: "",
                total: 10,
                given: 0,
            },
        ]
    },
];

const contentWrapper = document.getElementById("contentWrapper");



function render()
{
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

            createInput(categoryContent, ["col-md-1", "student-mark"], categoryItem.given, false, item.categoryTitle, categoryItem.content);
            createInput(categoryContent, ["col-md-1", "student-mark", "disabled-mark"], categoryItem.total, true, item.categoryTitle, categoryItem.content);
            
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
    inputContainer.classList.add(className);

    let input = document.createElement("input");
    input.disabled = disabled;
    input.setAttribute("category-title", categoryTitle);
    input.setAttribute("category-content", categoryContent);

    if (typeof className === "object")
    {
        className.forEach(item =>
        {
            inputContainer.classList.add(item);
        });
    }
    else
    {
        inputContainer.classList.add(className);
    }

    if (!disabled)
    {
        input.addEventListener("change", (ev)=>
        {
            let elem = ev.target;
            let mark = parseInt(elem.value);
            let categoryTitle = elem.getAttribute("category-title");
            let categoryContent = elem.getAttribute("category-content");
            if (mark > 0 && categoryTitle)
            {
                let selectedCategory = markingSchema.find(item => item.categoryTitle === categoryTitle);
                let selectedContent = selectedCategory ? selectedCategory.categoryContent.find(item => item.content === categoryContent) : null;
                
                if (selectedContent)
                {
                    selectedContent.given = mark;
                }
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