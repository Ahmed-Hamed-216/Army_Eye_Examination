// Function to analyze the input values
// function analyzeResults() {
//     const rightSph = parseFloat(document.getElementById("rightSph").value);
//     const rightCyl = parseFloat(document.getElementById("rightCyl").value);
//     const leftSph = parseFloat(document.getElementById("leftSph").value);
//     const leftCyl = parseFloat(document.getElementById("leftCyl").value);

//     let resultMessage = "";
//     let resultClass = "fit";

//     // ===== شروط غير لائق للخدمة =====
//     if (rightSph < -4 || leftSph < -4 || rightSph > 6 || leftSph > 6 || Math.abs(rightCyl - leftCyl) > 3) {
//         resultMessage = `
//             <strong>غير لائق للخدمة بسبب مشاكل النظر</strong><br>
//             <ul>
//                 <li>تفسير: تم اكتشاف أحد الشروط التالية:</li>
//                 <ul>
//                     <li>قصر نظر أكبر من -4 ديــوبتر في أي من العينين.</li>
//                     <li>أو طول نظر أكبر من +6 ديــوبتر في أي من العينين.</li>
//                     <li>أو فرق في الاستجماتيزم بين العينين يتجاوز 3 ديــوبتر.</li>
//                 </ul>
//             </ul>`;
//         resultClass = "exempt";
//     } 

//     // ===== شروط لائق ب (المستوى ب)  =====
//     else if ((rightSph >= -4 && rightSph < -2) || (leftSph >= -4 && leftSph < -2) || 
//              (rightSph >= 4 && rightSph <= 6) || (leftSph >= 4 && leftSph <= 6) || 
//              Math.abs(rightCyl) >= 2 || Math.abs(leftCyl) >= 2) {  // Add specific condition for Cyl values
//         resultMessage = `
//             <strong >لائق للخدمة (ب)</strong><br>
//             <ul>
//                 <li>تفسير: يُسمح بارتداء نظارة طبية، حيث تم استيفاء أحد الشروط التالية:</li>
//                 <ul>
//                     <li>قصر النظر بين -2 و -4 ديــوبتر.</li>
//                     <li>أو طول النظر بين +4 و +6 ديــوبتر.</li>
//                     <li>أو وجود استجماتيزم بدرجة متوسطة (بين 2 و 3.5 ديــوبتر).</li>
//                 </ul>
//                 <li>يُسمح بصرف نظارة طبية احتياطية للحفاظ على كفاءة الرؤية.</li>
//             </ul>`;
//         resultClass = "fit-b";
//     } 

//     // ===== لائق للخدمة (المستوى العادي) =====
//     else {
//         resultMessage = `
//             <strong>لائق للخدمة</strong><br>
//             <ul>
//                 <li>تفسير: لم يتم العثور على مشاكل كبيرة بالنظر تؤثر على اللياقة الطبية.</li>
//             </ul>`;
//     }

//     document.getElementById("resultText").innerHTML = resultMessage;
//     const resultDiv = document.getElementById("result");
//     resultDiv.style.display = "block";
//     resultDiv.className = `result mt-4 p-3 border rounded text-right ${resultClass}`;
// }

function analyzeResults() {
    const rightSph = parseFloat(document.getElementById("rightSph").value);
    const rightCyl = parseFloat(document.getElementById("rightCyl").value);
    const leftSph = parseFloat(document.getElementById("leftSph").value);
    const leftCyl = parseFloat(document.getElementById("leftCyl").value);

    let resultMessage = "";
    let resultClass = "fit";

    // تحليل وتوضيح حالة طول النظر
    resultMessage += "<h4>تحليل الحالة وفق الشروط</h4><ul>";
    resultMessage += "<li><strong>طول النظر:</strong><br>";

    if (rightSph >= -4 && rightSph <= 6 && leftSph >= -4 && leftSph <= 6) {
        resultMessage += `العين اليمنى عند ${rightSph} واليسرى عند ${leftSph}، وكلاهما ضمن النطاق المقبول (بين -4 و +6 ديــوبتر).`;
    } else {
        if (rightSph < -4 || leftSph < -4) {
            resultMessage += "قصر النظر أكبر من -4 ديــوبتر في إحدى العينين، مما يجعل الحالة غير لائقة للخدمة.";
            resultClass = "exempt";
        }
        if (rightSph > 6 || leftSph > 6) {
            resultMessage += "طول النظر أكبر من +6 ديــوبتر في إحدى العينين، مما يجعل الحالة غير لائقة للخدمة.";
            resultClass = "exempt";
        }
    }
    resultMessage += "</li>";

    // تحليل وتوضيح حالة الاستجماتيزم
    resultMessage += "<li><strong>الاستجماتيزم (Cyl):</strong><br>";

    if (Math.abs(rightCyl) <= 3.5 && Math.abs(leftCyl) <= 3.5) {
        resultMessage += `العين اليمنى: (${rightCyl}) ديــوبتر، والعين اليسرى: (${leftCyl}) ديــوبتر. كلاهما ضمن الحدود المقبولة للمستوى ب (حتى 3.5 ديــوبتر).<br>`;

    } else {
        if (Math.abs(rightCyl) > 3.5 || Math.abs(leftCyl) > 3.5) {
            resultMessage += "أحد العينين يعاني من استجماتيزم أكثر من 3.5 ديــوبتر، مما يجعل الحالة غير لائقة للخدمة.";
            resultClass = "exempt";
        }
    }

    // تحليل الفرق بين الاستجماتيزم في العينين
    const cylDifference = Math.abs(rightCyl - leftCyl);
    resultMessage += `الفرق في الاستجماتيزم بين العينين هو ${cylDifference} ديــوبتر.`;
    if (cylDifference > 3) {
        resultMessage += " الفرق أكبر من الحد الأقصى المقبول (3 ديــوبتر)، مما يجعل الحالة غير لائقة للخدمة.";
        resultClass = "exempt";
    } else {
        resultMessage += " الفرق ضمن النطاق المقبول.";
    }
    resultMessage += "</li></ul>";

    // تحديد التصنيف النهائي
    if (resultClass === "exempt") {
        resultMessage = `<strong>غير لائق للخدمة بسبب مشاكل النظر</strong><br>${resultMessage}`;
    } else if (
        ((rightSph >= -4 && rightSph < -2) || (leftSph >= -4 && leftSph < -2)) ||
        ((rightSph > 4 && rightSph <= 6) || (leftSph > 4 && leftSph <= 6)) ||
        Math.abs(rightCyl) >= 2 || Math.abs(leftCyl) >= 2
    ) {
        resultMessage = `<strong>لائق للخدمة (ب)</strong><br>${resultMessage}`;
        resultMessage += "<p>تفسير: يُسمح بارتداء نظارة طبية للمحافظة على كفاءة النظر، حيث أن بعض القيم تقع ضمن حدود القبول مع النظارات.</p>";
        resultClass = "fit-b";
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
