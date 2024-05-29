import BaseLayout from "../components/BaseLayout";
import React, { useState } from "react";
import styles from "./invoice-generator.module.css";

const PaymentInfo = () => {
  const [invoiceData, setInvoiceData] = useState({
    month: new Date().toISOString().substring(0, 7), // YYYY-MM format
    coldWater: "",
    hotWater: "",
    sewage: "",
    totalPrice: 0,
    invoiceID: "",
    unpaid: false,
  });

  const [isInvoiceGenerated, setIsInvoiceGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCalculateTotal = () => {
    const { coldWater, hotWater } = invoiceData;
    const coldWaterBill = parseFloat(coldWater) * 1632 || 0;
    const hotWaterBill = parseFloat(hotWater) * 1632 || 0;
    const total = coldWaterBill + hotWaterBill;
    const sewage = (parseFloat(coldWater) + parseFloat(hotWater)) * 1177 || 0;
    const finalTotal = total + sewage;

    setInvoiceData((prevData) => ({
      ...prevData,
      sewage: sewage.toFixed(2),
      totalPrice: finalTotal.toFixed(2),
    }));
  };

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    handleCalculateTotal();
    setIsInvoiceGenerated(true);
  };

  return (
    <BaseLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Нэхэмжлэх үүсгэх</h1>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleGenerateInvoice}>
            <div className={styles.labelsRow}>
              <label className={styles.label}>Сар:</label>
              <label className={styles.label}>Хүйтэн ус (м³):</label>
              <label className={styles.label}>Халуун ус (м³):</label>
              <label className={styles.label}>Бохир ус:</label>
              <label className={styles.label}>Нэхэмжлэх ID:</label>
            </div>
            <div className={styles.inputsRow}>
              <input
                type="month"
                name="month"
                className={styles.input}
                value={invoiceData.month}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="coldWater"
                placeholder="0"
                className={styles.input}
                value={invoiceData.coldWater === 0 ? "" : invoiceData.coldWater}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="hotWater"
                placeholder="0"
                className={styles.input}
                value={invoiceData.hotWater === 0 ? "" : invoiceData.hotWater}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="sewage"
                placeholder="0"
                className={styles.input}
                value={invoiceData.sewage === 0 ? "" : invoiceData.sewage}
                onChange={handleChange}
              />
              <input
                type="text"
                name="invoiceID"
                placeholder="Нэхэмжлэх ID"
                className={styles.input}
                value={invoiceData.invoiceID}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputsRow}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="unpaid"
                  className={styles.checkbox}
                  checked={invoiceData.unpaid}
                  onChange={handleChange}
                />
                <label className={styles.checkboxLabel}>Төлөгдөөгүй</label>
              </div>
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.button}>
                Нэхэмжлэх үүсгэх
              </button>
            </div>
          </form>

          <div className={styles.totalSection}>
            <label className={styles.sectionLabel}>Нийт төлбөр:</label>
            <div className={styles.totalBill}>₮{invoiceData.totalPrice}</div>
          </div>
        </div>

        {isInvoiceGenerated && (
          <div className={styles.invoiceDetails}>
            <h2>Нэхэмжлэхийн мэдээлэл</h2>
            <p>Сар: {invoiceData.month}</p>
            <p>Хүйтэн ус: {invoiceData.coldWater} м³</p>
            <p>Халуун ус: {invoiceData.hotWater} м³</p>
            <p>Бохир ус: {invoiceData.sewage} м³</p>
            <p>Нэхэмжлэх ID: {invoiceData.invoiceID}</p>
            <h3>Нийт төлбөр: ₮{invoiceData.totalPrice}</h3>
            <button className={styles.payButton}>Төлөх</button>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default PaymentInfo;
