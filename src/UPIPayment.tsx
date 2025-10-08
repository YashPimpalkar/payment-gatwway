import  { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; 
import jsPDF from "jspdf";

const UPIPayment = () => {
  const upiID = "yashpimpalkar214@oksbi"; // your UPI ID
  const name = "Yash Pimpalkar"; // your name
  const amount = "100.00";
  const note = "Payment for Service";

  const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  const [paid, setPaid] = useState(false);

  // Generate bill after successful payment
  const generateBill = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payment Receipt", 80, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`UPI ID: ${upiID}`, 20, 50);
    doc.text(`Amount: ₹${amount}`, 20, 60);
    doc.text(`Transaction Note: ${note}`, 20, 70);
    doc.text(`Status: SUCCESSFUL ✅`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 90);
    doc.save("payment-receipt.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Pay via UPI (₹{amount})
        </h1>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner inline-block mb-4">
          <QRCodeSVG value={upiLink} size={200} />
        </div>
        <p className="text-gray-600 mb-4">
          Scan this QR or click below to pay using any UPI app
        </p>

        {!paid ? (
          <a
            href={upiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => {
              setTimeout(() => setPaid(true), 5000); // simulate payment after 5s
            }}
          >
            Pay ₹{amount} Now
          </a>
        ) : (
          <div>
            <p className="text-green-700 font-semibold mt-4 mb-3">
              ✅ Payment Successful!
            </p>
            <button
              onClick={generateBill}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Download Bill
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIPayment;
