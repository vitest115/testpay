document.getElementById('invoice-form').addEventListener('submit', function(event) {
    event.preventDefault();  // منع إعادة تحميل الصفحة

    // الحصول على المبلغ المدخل
    const amount = document.getElementById('amount').value;

    // بيانات الفاتورة التي ستُرسل
    const invoiceData = {
        secretId: "je4dCacsUS1hIu28wsmr", // معرّف سري ثابت
        price: amount,                   // المبلغ المدخل من المستخدم
        title: "تجربة400",            // العنوان الثابت للفاتورة
        description: "this is test",     // الوصف الثابت
        accepts: {
            card: true,                 // الدفع بالبطاقات
            paypal: true,               // الدفع عبر PayPal
            coinbase: false             // لا يقبل الدفع بـ Coinbase
        },
        acceptGuestPayment: true         // يسمح بالدفع للضيوف
    };

    // إرسال البيانات إلى API عبر Fetch لإنشاء الفاتورة
    fetch('https://00acc.com/api/createInvoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
    })
    .then(response => response.json())
    .then(data => {
        // التحقق مما إذا كانت الاستجابة ناجحة
        if (data && data.hosted_url) {
            // إذا تم إنشاء الفاتورة بنجاح
            showMessage("تم إنشاء الفاتورة بنجاح!", "success");
        } else {
            // إذا كانت الاستجابة تحتوي على خطأ
            showMessage("حدث خطأ أثناء إنشاء الفاتورة. يرجى المحاولة لاحقًا.", "error");
        }
    })
    .catch(error => {
        // في حال حدوث خطأ في الطلب
        console.error('Error:', error);
        showMessage("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقًا.", "error");
    });
});

// دالة لعرض التنبيه
function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'block';
    messageElement.textContent = message;
    messageElement.className = type === 'success' ? 'success' : 'error';  // إضافة الفئة المناسبة للتنسيق
}
