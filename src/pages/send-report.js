import BaseLayout from "@/components/BaseLayout";
import React, { useState } from "react";
import styles from "./send-report.module.css";

const Mails = () => {
  const [billingData, setBillingData] = useState({
    previousMonthHotWater: [0, 0],
    previousMonthColdWater: [0, 0],
    currentMonthHotWater: [0, 0],
    currentMonthColdWater: [0, 0],
  });

  const [totalBill, setTotalBill] = useState(0);
  const [sewageBill, setSewageBill] = useState(0);
  const [finalBill, setFinalBill] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e, index, type) => {
    const { value } = e.target;
    setBillingData((prevData) => {
      const newData = { ...prevData };
      newData[type][index] = parseFloat(value) || 0;
      return newData;
    });
  };

  const handleCalculate = () => {
    const hotWaterUsage =
      billingData.currentMonthHotWater.reduce((acc, val) => acc + val, 0) -
      billingData.previousMonthHotWater.reduce((acc, val) => acc + val, 0);
    const coldWaterUsage =
      billingData.currentMonthColdWater.reduce((acc, val) => acc + val, 0) -
      billingData.previousMonthColdWater.reduce((acc, val) => acc + val, 0);

    const hotWaterBill = hotWaterUsage * 1632;
    const coldWaterBill = coldWaterUsage * 1632;

    const total = hotWaterBill + coldWaterBill;
    const sewage = (hotWaterUsage + coldWaterUsage) * 1177;
    const final = total + sewage;

    setTotalBill(total);
    setSewageBill(sewage);
    setFinalBill(final);
    setShowSubmit(true);

    alert(
      `Hot Water Usage: ${hotWaterUsage} units, Bill: ${hotWaterBill} MNT\nCold Water Usage: ${coldWaterUsage} units, Bill: ${coldWaterBill} MNT\nTotal Bill: ${total} MNT\nSewage Bill: ${sewage} MNT\nFinal Bill: ${final} MNT`
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "previousMonthHotWater",
      billingData.previousMonthHotWater.join(",")
    );
    formData.append(
      "previousMonthColdWater",
      billingData.previousMonthColdWater.join(",")
    );
    formData.append("hotwater", billingData.currentMonthHotWater.join(","));
    formData.append("coldwater", billingData.currentMonthColdWater.join(","));
    formData.append("totalBill", totalBill);
    formData.append("waste water", sewageBill);
    formData.append("amount", finalBill);

    imageFiles.forEach((file) => {
      formData.append(`images`, file);
    });

    try {
      const response = await fetch(
        "http://159.89.203.190:8001/invoices/acceptcount",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Report submitted successfully!");
      } else {
        alert("Failed to submit the report. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while submitting the report. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const filesURLs = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => prevImages.concat(filesURLs));
      setImageFiles((prevFiles) => prevFiles.concat(filesArray));

      filesArray.forEach((file) => URL.revokeObjectURL(file));
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const renderInputGroup = (label, type, index) => (
    <div className={styles.inputGroup}>
      <label>{label}:</label>
      <input
        type="number"
        placeholder="0000м.КУБ"
        value={billingData[type][index] || ""}
        onChange={(e) => handleChange(e, index, type)}
      />
    </div>
  );

  return (
    <BaseLayout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Заалт илгээх</h1>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Өмнөх сар</label>
          <div className={styles.row}>
            <label className={styles.subSectionLabel}>Гал тогоо</label>
            {renderInputGroup("Халуун ус", "previousMonthHotWater", 0)}
            {renderInputGroup("Хүйтэн ус", "previousMonthColdWater", 0)}
          </div>
          <div className={styles.row}>
            <label className={styles.subSectionLabel}>Ванн</label>
            {renderInputGroup("Халуун ус", "previousMonthHotWater", 1)}
            {renderInputGroup("Хүйтэн ус", "previousMonthColdWater", 1)}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Энэ сар</label>
          <div className={styles.row}>
            <label className={styles.subSectionLabel}>Гал тогоо</label>
            {renderInputGroup("Халуун ус", "currentMonthHotWater", 0)}
            {renderInputGroup("Хүйтэн ус", "currentMonthColdWater", 0)}
          </div>
          <div className={styles.row}>
            <label className={styles.subSectionLabel}>Ванн</label>
            {renderInputGroup("Халуун ус", "currentMonthHotWater", 1)}
            {renderInputGroup("Хүйтэн ус", "currentMonthColdWater", 1)}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Зураг байршуулах</label>
          <input type="file" multiple onChange={handleImageChange} />
          <div className={styles.imagePreviewContainer}>
            {selectedImages.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img
                  src={image}
                  alt={`Selected ${index}`}
                  style={{ width: "100px", height: "100px" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className={styles.removeButton}
                >
                  Устгах
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleCalculate}
            className={styles.button}
          >
            Заалт бодох
          </button>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Нийт төлбөр</label>
          <div className={styles.totalBill}>{finalBill} MNT</div>
        </div>

        {showSubmit && (
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.button}
            >
              Илгээх
            </button>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Mails;
