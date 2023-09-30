import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export function UserProfile() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // TODO: we will add payment section when we work on backend

  const handleEdit = (updatedAddress, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEditForm = (e, index) => {
    if (showAddAddressForm) {
      reset();
      setShowAddAddressForm(false);
    }
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };
  const handleAdd = (newAddress) => {
    const newUser = { ...user, addresses: [...user.addresses, newAddress] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div>
      <div className="mt-8 mx-auto bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="border-t flex items-center justify-center content-center border-gray-200 px-4 py-6 sm:px-6">
          <div>
            <h1 className="text-3xl my-4 font-bold tracking-tight text-gray-900">
              Name: {user.name ? user.name : "My Name"}
            </h1>
            <h3 className="text-xl my-4 font-bold tracking-tight text-red-900">
              Email: {user.email}
            </h3>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-6 sm:px-6">
          <button
            onClick={(e) => {
              if (selectedEditIndex !== -1) {
                setSelectedEditIndex(-1);
              }
              reset();
              setShowAddAddressForm(true);
            }}
            type="submit"
            className="rounded-md bg-green-600 my-5 px-3 py-2 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2"
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              noValidate
              className="bg-white px-5 py-12 mt-8"
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
            >
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label
                      htmlFor="name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register("name", {
                          required: "name is required",
                        })}
                        id="name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label
                      htmlFor="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div class="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                        type="email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div class="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone number is required",
                        })}
                        type="tel"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      ></input>
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label
                      htmlFor="street"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "street is required",
                        })}
                        id="street"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register("city", {
                          required: "city is required",
                        })}
                        id="city"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label
                      htmlFor="state"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "state is required",
                        })}
                        id="region"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / PinCode
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register("pinCode", {
                          required: "pinCode is required",
                        })}
                        id="pinCode"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={(e) => setShowAddAddressForm(false)}
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <p className="mt-5 text-sm text-gray-500">Your Address</p>
          {user.addresses.map((address, index) => (
            <div>
              {selectedEditIndex === index ? (
                <form
                  noValidate
                  className="bg-white px-5 py-12 mt-8"
                  onSubmit={handleSubmit((data) => {
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div class="sm:col-span-4">
                        <label
                          htmlFor="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-4">
                        <label
                          htmlFor="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div class="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div class="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone number is required",
                            })}
                            type="tel"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          ></input>
                        </div>
                      </div>

                      <div class="col-span-full">
                        <label
                          htmlFor="street"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          htmlFor="state"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="region"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / PinCode
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="button"
                        class="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="grid grid-cols-3 gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                <div className="flex items-center justify-center min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:flex sm:flex-col">
                  <div className="">
                    <p className="text-sm leading-6 text-gray-900">
                      {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
