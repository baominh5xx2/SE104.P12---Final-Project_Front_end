import React, { useState } from "react";
import ServiceConfirmationModal from "../../components/Modal/Modal_xacnhan/Modal_xacnhan";
import ServiceModal from "../../components/Modal/Modal_timkiemdichvu/Modal_timkiemdichvu"
import CustomerModal from "../../components/Modal/Modal_timkiemkhachhang/Modal_timkiemkhachhang";
import {
  Table,
  Layout,
  Menu,
  Input,
  Select,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
} from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import "./AdjustServicePage.css";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Search } = Input;
const App = () => {
  const [isPaid, setIsPaid] = useState(null); // null: chưa chọn, true: Đã thanh toán, false: Thanh toán sau

  // Hàm xử lý khi nhấn vào nút "Đã thanh toán"
  const handlePaidClick = () => {
    setIsPaid(true);
  };

  const handlePayLaterClick = () => {
    setIsPaid(false);
  };
  const { Option } = Select;  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);

  };
  const [searchValue, setSearchValue] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [customer, setCustomer] = useState({
    name: "Vân Mây",
    email: "vanmay.nguyennngoc@gmail.com",
    avatar: "https://via.placeholder.com/40", // Link ảnh đại diện (hoặc icon)
  });
  const [services] = useState([
    { id: 1, name: "Dịch vụ kiểm định và định giá", price: 1000000 },
    { id: 2, name: "Thiết kế trang sức theo yêu cầu", price: 5000000 },
    { id: 3, name: "Tư vấn cá nhân hóa", price: 1000000 },
    { id: 4, name: "Dịch vụ bảo hành và đổi trả", price: 2000000 },
    { id: 5, name: "Chương trình khách hàng thân thiết", price: 5000000 },
  ]);  
  const onSearch1 = (value) => {
    console.log("Tìm kiếm:", value);
    // Thực hiện logic tìm kiếm ở đây
  };
  const columns = [
    {
      title: <span style={{ fontSize: "20px" }}>Dịch vụ</span>,
      dataIndex: "name",
      key: "name",
      align: "left",
      width: "50%",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image || "https://via.placeholder.com/40"} // Sử dụng ảnh mặc định nếu không có `image`
            alt="Dịch vụ"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <span className="title_1">{text}</span>
        </div>
      )      
    },
    {
      title: <span style={{ fontSize: "20px" }}>Số lượng</span>,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ margin: '0 8px' }}>{record.quantity}</span>
        </div>
      )
    },
    {
      title: <span style={{ fontSize: "20px"}}>Thành tiền</span>,
      key: "totalAndAction",
      align: "left",
      width: "40%",
      render: (text, record) => (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          position: "relative",  // Add relative positioning
          width: "100%"         // Ensure full width
        }}>
          <span className="title_1">{record.total}</span>
          <Button
            type="text"
            danger
            onClick={() => handleDeleteService(record.id)}
            className="delete"
            style={{ 
              position: "absolute",  // Position absolutely
              right: "-100px",           // Align to right edge
              top: "50%",           // Center vertically
              transform: "translateY(-50%)" // Perfect vertical centering
            }}
          >
            X
          </Button>
        </div>
      ),
    }
  ];
  const onSearch2 = () => {
    setIsModalVisible(true);
  };
  const [totalQuantity, setTotalQuantity] = useState(0); // Tổng số lượng dịch vụ
  const [totalAmount, setTotalAmount] = useState(0); // Tổng tiền
  // Hàm xử lý khi xác nhận chọn dịch vụ từ modal
  const handleCancel_cus = () => {
    setIsCustomerModalVisible(false);
  };
  const handleConfirm_cus = (customers) => {
    console.log("Selected customers:", customers);
    setSelectedCustomers(customers);
    setIsCustomerModalVisible(false);
  };
  const handleConfirm = (selectedServices) => {
    console.log("Dịch vụ đã chọn:", selectedServices);
    const updatedData = [...data, ...selectedServices.map(service => ({
      ...service,
      total: service.price.toLocaleString() + " VND", // Tính tổng tiền cho từng dịch vụ
    }))];
  
    const newTotalAmount = updatedData.reduce((sum, item) => {
      const totalValue = item.price ? parseInt(item.price, 10) : 0;
      return sum + totalValue;
    }, 0);
  
    setData(updatedData); // Cập nhật dữ liệu cho bảng
    setTotalAmount(newTotalAmount); // Cập nhật tổng tiền
    setTotalQuantity(updatedData.length); // Cập nhật số lượng dịch vụ
    setIsModalVisible(false); // Đóng modal
  };
  const customers = [
    { id: 1, name: "Nguyễn Văn A", phone: "0312456789" },
    { id: 2, name: "Trần Thị Ngọc B", phone: "0918276345" },
    { id: 3, name: "Văn Mây", phone: "0328345671" },
  ];
  const handleSearch = () => {
    const result = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCustomers(result);
    setIsCustomerModalVisible(true);
  };

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [data, setData] = useState([]); // Khởi tạo state cho danh sách dịch vụ
  const discount = 50000; // Example discount
  const shippingFee = 30000; // Example shipping fee
  const totalquantity = data.length;
  const totalamount = data.reduce((sum, item) => sum + (item.price || 0), 0);
  const subTotal = totalAmount - discount; // Temporary calculation
  const vat = Math.round((subTotal - shippingFee) * 0.08); // VAT 8%
  const totalPayable = subTotal + vat; // Final amount to be paid
  // Function to handle deleting a service from the table
const handleDeleteService = (id) => {
  const updatedData = data.filter((service) => service.id !== id); // Filter out the service with the given ID
  setData(updatedData); // Update the state with the new data

  // Update total amount and quantity dynamically
  const newTotalAmount = updatedData.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );
  setTotalAmount(newTotalAmount);
  setTotalQuantity(updatedData.length);
};
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const handleConfirmSave = () => {
    // Add your save logic here
    console.log('Saving service...');
    setIsConfirmModalVisible(false);
  };

  const handleCancelSave = () => {
    setIsConfirmModalVisible(false);
  };
  return (
    <Layout className="app-layout">
      <div className="bod">
        <Layout>
          <Content className="app-content">
            <div className="title-container">
              <h1 className="title">Sửa thông tin phiếu dịch vụ</h1>
              <img src="/bell.jpg" alt="Logo" className="logo-imag1" />
              <img src="/girl.jpg" alt="Logo" className="logo-imag2" />
            </div>

            <div className="header-actions">
              <Button type="default" className="action-btnt">
                Hủy
              </Button>
              <Button type="primary" className="action-btnt" onClick={() => setIsConfirmModalVisible(true)}>
                + Lưu thay đổi
              </Button>
            </div>

            <ServiceConfirmationModal
              isVisible={isConfirmModalVisible}
              onConfirm={handleConfirmSave}
              onCancel={handleCancelSave}
              title="Xác nhận lưu"
              amount={totalPayable}
              content="Bạn có chắc chắn muốn lưu phiếu dịch vụ này không?"
            />

            <Row gutter={16} className="classification-status">
              <Col span={12}>
                <div className="section" style={{
                  backgroundColor: "#f8f9ff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                  border: "1px solid #e6e9f0",
                  width: "1000px",
                  marginTop: "0px",
                }}>
                  <h2>Dịch vụ đăng ký</h2>
                  <Button
                    type="primary"
                    style={{
                      width: "200px",
                      marginBottom: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      backgroundColor: "#1890ff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(24, 144, 255, 0.2)",
                    }}
                    onClick={onSearch2}
                  >
                    Chọn dịch vụ
                  </Button>

                  <Table
                    dataSource={data}
                    columns={columns}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      overflow: "hidden"
                    }}
                    bordered
                    pagination={false}
                  />

                  <Row style={{ 
                    marginTop: "16px", 
                    fontWeight: "bold",
                    padding: "12px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <Col span={12}>Tổng số lượng dịch vụ: {totalQuantity}</Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      Tổng tiền: {totalAmount.toLocaleString()} VND
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <ServiceModal
              isVisible={isModalVisible}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
              services={services}
            />

            {/* Thông tin khách hàng */}
            <div style={{
              backgroundColor: "#f8f9ff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              border: "1px solid #e6e9f0",
              width: "1000px",
              marginTop: "20px",
            }}>
              <h2>Khách hàng</h2>
              <Row gutter={16} align="middle" style={{ marginBottom: "32px" }}>
                <Col span={24} style={{ display: "flex", alignItems: "left" }}>
                  <Button
                    type="primary"
                    onClick={handleSearch}
                    style={{ 
                      borderRadius: "8px",
                      width: "200px",
                    }}
                  >
                    Tìm kiếm
                  </Button>
                  <span style={{ marginLeft: "10px" }}>hoặc</span>
                  <a href="#" style={{ marginLeft: "10px", color: "#1890ff" }}>
                    + Tạo khách hàng mới
                  </a>
                </Col>
              </Row>

              <CustomerModal
                isVisible={isCustomerModalVisible}
                onCancel={() => setIsCustomerModalVisible(false)}
                onConfirm={handleConfirm_cus}
                customers={customers}
              />

              {/* Hiển thị khách hàng đã chọn */}
              {selectedCustomers && selectedCustomers.length > 0 && (
                <div style={{ 
                  maxHeight: "300px", 
                  overflowY: "auto",
                  padding: "8px",
                  borderRadius: "8px",
                }}>
                  {selectedCustomers.map(customer => (
                    <Card
                      key={customer.id}
                      bordered={false}
                      style={{ 
                        marginBottom: "8px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserOutlined
                          style={{
                            fontSize: "40px",
                            marginRight: "10px",
                            color: "#1890ff",
                          }}
                        />
                        <div>
                          <span style={{ fontSize: "16px", fontWeight: "500" }}>
                            {customer.name}
                          </span>
                          <br />
                          <span style={{ color: "#888" }}>{customer.phone}</span>
                        </div>
                        <Button 
                          type="text" 
                          danger
                          onClick={() => {
                            setSelectedCustomers(prev => 
                              prev.filter(c => c.id !== customer.id)
                            );
                          }}
                          style={{
                            marginLeft: "auto"
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Phần thanh toán */}
            {data.length > 0 && (
              <div style={{
                backgroundColor: "#f8f9ff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                border: "1px solid #e6e9f0",
                width: "1000px",
                marginTop: "20px",
              }}>
                <h2>Thanh toán</h2>
                <Row gutter={16}>
                  {/* Cột ghi chú */}
                  <Col span={12}>
                    <div style={{ marginBottom: "16px" }}>
                      <label>Ghi chú phiếu dịch vụ</label>
                      <Input.TextArea
                        placeholder="Nhập ghi chú dịch vụ tại đây"
                        rows={4}
                        style={{ marginTop: "8px" }}
                      />
                    </div>
                  </Col>

                  {/* Cột thông tin thanh toán */}
                  <Col span={12}>
                    <Row justify="space-between">
                    <Col span={12}>Số lượng dịch vụ</Col>
                    <Col span={12} style={{ textAlign: "right" }}>{totalquantity}</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: "8px" }}>
                    <Col span={12}>Tổng tiền dịch vụ</Col>
                    <Col span={12} style={{ textAlign: "right" }}>{totalamount.toLocaleString()} VND</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: "8px" }}>
                    <Col span={12}>Giảm giá</Col>
                    <Col span={12} style={{ textAlign: "right" }}>-{discount.toLocaleString()} VND</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: "8px" }}>
                    <Col span={12}>Tạm tính</Col>
                    <Col span={12} style={{ textAlign: "right" }}>{subTotal.toLocaleString()} VND</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: "8px" }}>
                    <Col span={12}>Phí vận chuyển</Col>
                    <Col span={12} style={{ textAlign: "right" }}>{shippingFee.toLocaleString()} VND</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: "8px" }}>
                    <Col span={12}>Thuế VAT (8%)</Col>
                    <Col span={12} style={{ textAlign: "right" }}>{vat.toLocaleString()} VND</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: "8px", fontWeight: "bold" }}>
                    <Col span={12} style={{ fontWeight: "bold" }}>Phải thu</Col>
                    <Col span={12} style={{ textAlign: "right", fontWeight: "bold" }}>{totalPayable.toLocaleString()} VND</Col>
                    </Row>
                  </Col>
                </Row>

                {/* Checkbox và nút */}
                <div className="invoice-checkbox-container">
                  <Checkbox />
                  <span className="invoice-checkbox-label">Yêu cầu xuất hóa đơn điện tử</span>
                </div>
                <Row justify="end" style={{ marginTop: "16px" }} gutter={16}>
                  <Col>
                    <Button
                      className={`payment-button ${isPaid === true ? "primary" : "default"}`}
                      onClick={() => setIsPaid(isPaid === true ? null : true)} // Đổi trạng thái khi nhấn
                    >
                      Đã thanh toán
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className={`payment-button ${isPaid === false ? "primary" : "default"}`}
                      onClick={() => setIsPaid(isPaid === false ? null : false)} // Đổi trạng thái khi nhấn
                    >
                      Thanh toán sau
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default App;
