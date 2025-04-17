"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

// Treatment entry type
type Treatment = {
  id?: string;
  crop_id: string;
  date: string;
  product_name: string;
  active_ingredient: string;
  quantity: string;
  target_pest: string;
  weather_conditions: string;
  notes: string;
  created_at?: string;
};

// Crop type
type Crop = {
  id: string;
  name: string;
  area: number;
  sowing_date: string;
  flowering_date: string | null;
  harvest_date: string | null;
};

// Add fake data
const fakeCrops: Crop[] = [
  {
    id: "1",
    name: "Vineyard Block A",
    area: 2.5,
    sowing_date: "2024-03-15",
    flowering_date: "2024-05-20",
    harvest_date: "2024-09-10"
  },
  {
    id: "2",
    name: "Apple Orchard East",
    area: 1.8,
    sowing_date: "2020-03-01",
    flowering_date: "2024-04-05",
    harvest_date: "2024-08-15"
  },
  {
    id: "3",
    name: "Olive Grove South",
    area: 3.2,
    sowing_date: "2019-04-10",
    flowering_date: "2024-05-15",
    harvest_date: "2024-10-20"
  }
];

const fakeTreatments: Treatment[] = [
  {
    id: "1",
    crop_id: "1",
    date: "2024-03-25",
    product_name: "Copper Hydroxide",
    active_ingredient: "Copper hydroxide",
    quantity: "2.5 kg/ha",
    target_pest: "Downy mildew",
    weather_conditions: "Sunny, 18°C, light wind",
    notes: "Preventive treatment after rain"
  },
  {
    id: "2",
    crop_id: "1",
    date: "2024-04-10",
    product_name: "Myclobutanil 12.5%",
    active_ingredient: "Myclobutanil",
    quantity: "0.3 L/ha",
    target_pest: "Powdery mildew",
    weather_conditions: "Cloudy, 16°C, no wind",
    notes: "Applied during early flowering stage"
  },
  {
    id: "3",
    crop_id: "2",
    date: "2024-04-15",
    product_name: "Neem Oil",
    active_ingredient: "Azadirachtin",
    quantity: "1.5 L/ha",
    target_pest: "Apple scab",
    weather_conditions: "Clear, 20°C, moderate wind",
    notes: "Organic treatment application"
  }
];

export default function FieldDiary() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [isAddingTreatment, setIsAddingTreatment] = useState(false);
  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  // New treatment form state
  const [newTreatment, setNewTreatment] = useState<Treatment>({
    crop_id: "",
    date: format(new Date(), "yyyy-MM-dd"),
    product_name: "",
    active_ingredient: "",
    quantity: "",
    target_pest: "",
    weather_conditions: "",
    notes: ""
  });

  // New crop form state
  const [newCrop, setNewCrop] = useState<Omit<Crop, "id">>({
    name: "",
    area: 0,
    sowing_date: format(new Date(), "yyyy-MM-dd"),
    flowering_date: null,
    harvest_date: null
  });

  // Fetch crops and treatments data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Set crops data
        setCrops(fakeCrops);

        // Set default selected crop
        const firstCropId = fakeCrops[0].id;
        setSelectedCrop(firstCropId);
        setNewTreatment(prev => ({ ...prev, crop_id: firstCropId }));

        // Set treatments for first crop
        const cropTreatments = fakeTreatments.filter(t => t.crop_id === firstCropId);
        setTreatments(cropTreatments);

      } catch (error) {
        console.error("Error loading data:", error);
        setMessage({ type: "error", text: "Failed to load field diary data" });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle crop selection change
  const handleCropChange = async (cropId: string) => {
    setSelectedCrop(cropId);
    setNewTreatment(prev => ({ ...prev, crop_id: cropId }));

    setIsLoading(true);
    try {
      const cropTreatments = fakeTreatments.filter(t => t.crop_id === cropId);
      setTreatments(cropTreatments);
    } catch (error) {
      console.error("Error fetching treatments:", error);
      setMessage({ type: "error", text: "Failed to load treatments" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new treatment form input changes
  const handleTreatmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTreatment(prev => ({ ...prev, [name]: value }));
  };

  // Handle new crop form input changes
  const handleCropFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "area") {
      setNewCrop(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewCrop(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit new treatment
  const handleTreatmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newTreatmentWithId = {
        ...newTreatment,
        id: (fakeTreatments.length + 1).toString(),
        created_at: new Date().toISOString()
      };

      // Add to fake treatments array
      fakeTreatments.push(newTreatmentWithId);

      // Update treatments state
      setTreatments([newTreatmentWithId, ...treatments]);
      setMessage({ type: "success", text: "Treatment added successfully" });

      // Reset form and close it
      setNewTreatment({
        crop_id: selectedCrop,
        date: format(new Date(), "yyyy-MM-dd"),
        product_name: "",
        active_ingredient: "",
        quantity: "",
        target_pest: "",
        weather_conditions: "",
        notes: ""
      });
      setIsAddingTreatment(false);
    } catch (error) {
      console.error("Error adding treatment:", error);
      setMessage({ type: "error", text: "Failed to add treatment" });
    }
  };

  // Submit new crop
  const handleCropSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newCropWithId = {
        ...newCrop,
        id: (fakeCrops.length + 1).toString()
      };

      // Add to fake crops array
      fakeCrops.push(newCropWithId);

      // Update crops state
      setCrops([...crops, newCropWithId]);
      setSelectedCrop(newCropWithId.id);
      setMessage({ type: "success", text: "Crop added successfully" });

      // Reset form and close it
      setNewCrop({
        name: "",
        area: 0,
        sowing_date: format(new Date(), "yyyy-MM-dd"),
        flowering_date: null,
        harvest_date: null
      });
      setIsAddingCrop(false);

      // Clear treatments for new crop
      setTreatments([]);
    } catch (error) {
      console.error("Error adding crop:", error);
      setMessage({ type: "error", text: "Failed to add crop" });
    }
  };

  // Delete a treatment
  const handleDeleteTreatment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment record?")) {
      return;
    }

    try {
      const index = fakeTreatments.findIndex(t => t.id === id);
      if (index > -1) {
        fakeTreatments.splice(index, 1);
      }

      setTreatments(treatments.filter(t => t.id !== id));
      setMessage({ type: "success", text: "Treatment deleted successfully" });
    } catch (error) {
      console.error("Error deleting treatment:", error);
      setMessage({ type: "error", text: "Failed to delete treatment" });
    }
  };

  // Update crop phenological dates
  const handleUpdateCropDates = async (cropId: string) => {
    const cropToUpdate = crops.find(c => c.id === cropId);
    if (!cropToUpdate) return;

    try {
      setMessage({ type: "success", text: "Crop dates updated successfully" });
    } catch (error) {
      console.error("Error updating crop dates:", error);
      setMessage({ type: "error", text: "Failed to update crop dates" });
    }
  };

  // Handle flowering date change
  const handleFloweringDateChange = (e: React.ChangeEvent<HTMLInputElement>, cropId: string) => {
    const newDate = e.target.value;
    setCrops(crops.map(crop =>
      crop.id === cropId ? { ...crop, flowering_date: newDate } : crop
    ));
  };

  // Handle harvest date change
  const handleHarvestDateChange = (e: React.ChangeEvent<HTMLInputElement>, cropId: string) => {
    const newDate = e.target.value;
    setCrops(crops.map(crop =>
      crop.id === cropId ? { ...crop, harvest_date: newDate } : crop
    ));
  };

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-agroke-green/65 text-agroke-black-light px-6 py-4">
            <h1 className="text-2xl font-bold">Field Diary</h1>
            <p className="">Record of treatments carried out</p>
          </div>

          {/* Message banner */}
          {message && (
            <div
              className={`px-6 py-3 ${
                message.type === "success" ? "bg-green-100 text-green-800" :
                message.type === "error" ? "bg-red-100 text-red-800" :
                "bg-blue-100 text-blue-800"
              }`}
            >
              {message.text}
              <button
                className="float-right text-sm"
                onClick={() => setMessage(null)}
              >
                ✕
              </button>
            </div>
          )}

          {/* Main content */}
          <div className="p-6">
            {/* Crops selector and actions */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <label htmlFor="crop-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Crop Section:
                </label>
                <div className="flex">
                  <select
                    id="crop-select"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                    value={selectedCrop}
                    onChange={(e) => handleCropChange(e.target.value)}
                    disabled={crops.length === 0 || isLoading}
                  >
                    {crops.length === 0 ? (
                      <option value="">No crops available</option>
                    ) : (
                      crops.map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {crop.name} ({crop.area} hectares)
                        </option>
                      ))
                    )}
                  </select>
                  <button
                    className="ml-2 px-3 py-2 bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold rounded-md transition"
                    onClick={() => setIsAddingCrop(true)}
                  >
                    New Crop
                  </button>
                </div>
              </div>

              <button
                className="bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold py-2 px-4 rounded transition"
                onClick={() => {
                  if (crops.length === 0) {
                    setMessage({ type: "error", text: "Please add a crop first" });
                    setIsAddingCrop(true);
                  } else {
                    setIsAddingTreatment(true)
                  }
                }}
              >
                Add Treatment
              </button>
            </div>

            {/* Selected crop details */}
            {selectedCrop && crops.find(c => c.id === selectedCrop) && (
              <div className="mb-8 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Crop Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {crops.filter(c => c.id === selectedCrop).map(crop => (
                    <div key={`details-${crop.id}`}>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Sowing/Planting Date:</span> {formatDisplayDate(crop.sowing_date)}
                      </p>

                      <div className="mt-2">
                        <label className="block text-sm text-gray-600">Flowering Start Date:</label>
                        <input
                          type="date"
                          value={crop.flowering_date || ""}
                          onChange={(e) => handleFloweringDateChange(e, crop.id)}
                          className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                        />
                      </div>

                      <div className="mt-2">
                        <label className="block text-sm text-gray-600">Harvest Date:</label>
                        <input
                          type="date"
                          value={crop.harvest_date || ""}
                          onChange={(e) => handleHarvestDateChange(e, crop.id)}
                          className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                        />
                      </div>

                      <button
                        onClick={() => handleUpdateCropDates(crop.id)}
                        className="mt-2 text-sm text-green-600 hover:text-green-800"
                      >
                        Update Dates
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treatments list */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Treatment Records</h2>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading records...</p>
                </div>
              ) : treatments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No treatment records found for this crop.</p>
                  <p className="text-sm text-gray-400 mt-1">Add a new treatment to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border text-left">Date</th>
                        <th className="py-2 px-4 border text-left">Product</th>
                        <th className="py-2 px-4 border text-left">Active Ingredient</th>
                        <th className="py-2 px-4 border text-left">Quantity</th>
                        <th className="py-2 px-4 border text-left">Target Pest</th>
                        <th className="py-2 px-4 border text-left">Weather</th>
                        <th className="py-2 px-4 border text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treatments.map((treatment) => (
                        <tr key={treatment.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border">{formatDisplayDate(treatment.date)}</td>
                          <td className="py-2 px-4 border">{treatment.product_name}</td>
                          <td className="py-2 px-4 border">{treatment.active_ingredient}</td>
                          <td className="py-2 px-4 border">{treatment.quantity}</td>
                          <td className="py-2 px-4 border">{treatment.target_pest}</td>
                          <td className="py-2 px-4 border">{treatment.weather_conditions}</td>
                          <td className="py-2 px-4 border">
                            <button
                              onClick={() => handleDeleteTreatment(treatment.id!)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete treatment record"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Export Button */}
            {treatments.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    setMessage({ type: "info", text: "Export functionality will be available in a future update" });
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Export Records
                </button>
              </div>
            )}
          </div>

          {/* Regulatory information */}
          <div className="bg-blue-50 p-6 border-t border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Regulatory Information</h3>
            <p className="text-sm text-gray-700">
              According to Presidential Decree No. 290 of 2001, Article 42, paragraph 3, all farmers must maintain a &quot;Record of Treatments&quot;
              for all phytosanitary products used. This record must be updated within 30 days of application and kept for at least one year.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              The record should document all pest control and weed control operations across all crop sections. Private gardens and orchards
              for personal consumption are exempt from this requirement.
            </p>
          </div>
        </div>
      </div>

      {/* Add Treatment Modal */}
      {isAddingTreatment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add New Treatment</h3>
                <button
                  onClick={() => setIsAddingTreatment(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleTreatmentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Application
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={newTreatment.date}
                      onChange={handleTreatmentChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      value={newTreatment.product_name}
                      onChange={handleTreatmentChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Active Ingredient
                    </label>
                    <input
                      type="text"
                      name="active_ingredient"
                      value={newTreatment.active_ingredient}
                      onChange={handleTreatmentChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity Used
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={newTreatment.quantity}
                      onChange={handleTreatmentChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      placeholder="e.g., 2.5 L/ha"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Pest/Disease
                    </label>
                    <input
                      type="text"
                      name="target_pest"
                      value={newTreatment.target_pest}
                      onChange={handleTreatmentChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weather Conditions
                    </label>
                    <input
                      type="text"
                      name="weather_conditions"
                      value={newTreatment.weather_conditions}
                      onChange={handleTreatmentChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      placeholder="e.g., Sunny, 25°C, light wind"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newTreatment.notes}
                    onChange={handleTreatmentChange}
                    rows={3}
                    className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                    placeholder="Any additional information..."
                  ></textarea>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingTreatment(false)}
                    className="mr-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Treatment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Crop Modal */}
      {isAddingCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add New Crop Section</h3>
                <button
                  onClick={() => setIsAddingCrop(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCropSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Crop Name/Section
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCrop.name}
                      onChange={handleCropFormChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      placeholder="e.g., Vineyard Block A"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area (hectares)
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={newCrop.area}
                      onChange={handleCropFormChange}
                      step="0.01"
                      min="0"
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sowing/Planting Date
                    </label>
                    <input
                      type="date"
                      name="sowing_date"
                      value={newCrop.sowing_date}
                      onChange={handleCropFormChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Flowering and harvest dates can be added later</li>
                    <li>• All treatments must be recorded within 30 days of application</li>
                    <li>• Records must be maintained for at least 3 years</li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingCrop(false)}
                    className="mr-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Crop Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Guidelines Modal - Triggered by Info Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowGuidelines(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors"
          title="View Regulatory Guidelines"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {showGuidelines && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Regulatory Guidelines</h3>
                <button
                  onClick={() => setShowGuidelines(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold text-gray-800">Legal Requirements</h4>
                <p className="text-gray-600">According to Presidential Decree No. 290 of 2001, Article 42, paragraph 3:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>All farmers must maintain a detailed &quot;Record of Treatments&quot;</li>
                  <li>Records must be updated within 30 days of application</li>
                  <li>Records must be kept for a minimum of 3 years</li>
                  <li>All phytosanitary products used must be documented</li>
                </ul>

                <h4 className="text-lg font-semibold text-gray-800 mt-4">Required Information</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Date of application</li>
                  <li>Product name and active ingredients</li>
                  <li>Quantity used per hectare</li>
                  <li>Target pest or disease</li>
                  <li>Weather conditions during application</li>
                </ul>

                <h4 className="text-lg font-semibold text-gray-800 mt-4">Exemptions</h4>
                <p className="text-gray-600">
                  Private gardens and orchards used exclusively for personal consumption are exempt from these requirements.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowGuidelines(false)}
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}