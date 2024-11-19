function analyzeResults() {
    const rightSph = parseFloat(document.getElementById("rightSph").value);
    const rightCyl = parseFloat(document.getElementById("rightCyl").value);
    const rightAxis = parseFloat(document.getElementById("rightAxis").value);
    const leftSph = parseFloat(document.getElementById("leftSph").value);
    const leftCyl = parseFloat(document.getElementById("leftCyl").value);
    const leftAxis = parseFloat(document.getElementById("leftAxis").value);

    let resultMessage = "";
    let resultClass = "fit";

    // تحليل الحالة
    resultMessage += "<h4>تحليل الحالة وفق الشروط</h4><ul>";

    // تحليل طول النظر (SPH)
    resultMessage += "<li><strong>طول النظر (SPH):</strong><br>";
    if (rightSph > 6 || rightSph < -4 || leftSph > 6 || leftSph < -4) {
        resultMessage += `أحد العينين يتجاوز الحد المقبول (+6 أو -4 ديوبتر)، مما يجعل الحالة غير لائقة طبياً.<br>`;
        resultClass = "exempt";
    } else if (
        (rightSph >= -4 && rightSph < -2) ||
        (leftSph >= -4 && leftSph < -2) ||
        (rightSph > 4 && rightSph <= 6) ||
        (leftSph > 4 && leftSph <= 6)
    ) {
        resultMessage += `طول النظر يقع ضمن النطاق المقبول للمستوى ب (-4 إلى -2 أو +4 إلى +6 ديوبتر).<br>`;
        resultClass = "fit-b";
    } else {
        resultMessage += `طول النظر ضمن النطاق الطبيعي المقبول (-2 إلى +4 ديوبتر).<br>`;
    }
    resultMessage += "</li>";

    // تحليل الاستجماتيزم (CYL)
    resultMessage += "<li><strong>الاستجماتيزم (CYL):</strong><br>";
    if (Math.abs(rightCyl) > 3.5 || Math.abs(leftCyl) > 3.5) {
        resultMessage += `أحد العينين يعاني من استجماتيزم أكبر من ±3.5 ديوبتر، مما يجعل الحالة غير لائقة طبياً.<br>`;
        resultClass = "exempt";
    } else if (
        (Math.abs(rightCyl) > 2 && Math.abs(rightCyl) <= 3.5) ||
        (Math.abs(leftCyl) > 2 && Math.abs(leftCyl) <= 3.5)
    ) {
        resultMessage += `الاستجماتيزم يقع ضمن النطاق المقبول للمستوى ب (±2 إلى ±3.5 ديوبتر).<br>`;
        resultClass = "fit-b";
    } else {
        resultMessage += `الاستجماتيزم ضمن النطاق الطبيعي المقبول (أقل من ±2 ديوبتر).<br>`;
    }

    // تحليل الفرق في الاستجماتيزم بين العينين
    const cylDifference = Math.abs(rightCyl - leftCyl);
    resultMessage += `<li><strong>الفرق في الاستجماتيزم بين العينين:</strong><br>`;
    resultMessage += `الفرق هو ${cylDifference} ديوبتر.<br>`;
    if (cylDifference > 3) {
        resultMessage += "الفرق أكبر من 3 ديوبتر، مما يجعل الحالة غير لائقة طبياً.<br>";
        resultClass = "exempt";
    } else if (cylDifference > 2 && cylDifference <= 3) {
        resultMessage += "الفرق يقع ضمن النطاق المقبول للمستوى ب (2 إلى 3 ديوبتر).<br>";
        resultClass = "fit-b";
    } else {
        resultMessage += "الفرق ضمن النطاق الطبيعي المقبول (أقل من 2 ديوبتر).<br>";
    }

    // تحليل الاستجماتيزم غير المنتظم (فرق زاوية Axis)
    const axisDifference = Math.abs(rightAxis - leftAxis);
    resultMessage += `<li><strong>الاستجماتيزم غير المنتظم:</strong><br>`;
    if (axisDifference > 15 && (Math.abs(rightCyl) > 2 || Math.abs(leftCyl) > 2)) {
        resultMessage += `فرق الزوايا بين العينين (${axisDifference} درجة) يشير إلى استجماتيزم غير منتظم، مما يجعل الحالة غير لائقة طبياً.<br>`;
        resultClass = "exempt";
    } else {
        resultMessage += "لا يوجد دليل على استجماتيزم غير منتظم.<br>";
    }
    resultMessage += "</li></ul>";

    // تحديد التصنيف النهائي
    if (resultClass === "exempt") {
        resultMessage = `<strong>غير لائق للخدمة بسبب مشاكل النظر</strong><br>${resultMessage}`;
    } else if (resultClass === "fit-b") {
        resultMessage = `<strong>لائق للخدمة (ب)</strong><br>${resultMessage}`;
        resultMessage += "<p>تفسير: يُسمح بارتداء نظارة طبية لتحسين النظر ضمن النطاق المقبول.</p>";
    } else {
        resultMessage = `<strong>لائق للخدمة</strong><br>${resultMessage}`;
        resultMessage += "<p>تفسير: جميع القيم ضمن النطاق الطبيعي المسموح به للخدمة.</p>";
    }

    // عرض النتيجة النهائية
    document.getElementById("resultText").innerHTML = resultMessage;
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.className = `result mt-4 p-3 border rounded text-right ${resultClass}`;
}


// Dark mode toggle function
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> تفعيل الوضع النهاري' : '<i class="fas fa-moon"></i> تفعيل الوضع الليلي';
});

// Font Size Adjustments
let fontSize = 1;
function increaseFontSize() {
    fontSize += 0.1;
    document.body.style.fontSize = `${fontSize}em`;
}

function decreaseFontSize() {
    fontSize = Math.max(0.9, fontSize - 0.1);
    document.body.style.fontSize = `${fontSize}em`;
}

// Print as PDF
function printPDF() {
    window.print();
}
