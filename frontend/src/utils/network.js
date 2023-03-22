import { get, has, isEmpty } from "lodash";

const API_ROOT = "http://localhost:4250/";

class Network {
  static async login(username, password) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return fetch(API_ROOT + "auth/token", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Invalid Email Address or Password.");
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (has(data, "access_token")) {
          return get(data, "access_token");
        } else {
          throw new Error(
            "Server responded with invalid data. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async register(first_name, last_name, email, password) {
    return fetch(API_ROOT + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("An account already exists with this email address.");
        } else if (response.status !== 201) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async profile(token) {
    return fetch(API_ROOT + "auth/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Invalid Credentials. Please log out and back in.");
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (
          has(data, "first_name") &&
          has(data, "last_name") &&
          has(data, "email")
        ) {
          return data;
        } else {
          throw new Error(
            "Server responded with invalid data. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async getUserBids(token) {
    return fetch(API_ROOT + "bids/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Invalid Credentials. Please log out and back in.");
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (has(data, "winning_bids") && has(data, "losing_bids")) {
          return data;
        } else {
          throw new Error(
            "Server responded with invalid data. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async getItems() {
    return fetch(API_ROOT + "items/items", {
      method: "GET",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (has(data, "items")) {
          return data["items"];
        } else {
          throw new Error(
            "Server responded with invalid data. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async getItem(item_name) {
    return fetch(
      API_ROOT + "items/item?" + new URLSearchParams({ item_name: item_name }),
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async getBidDelta() {
    return fetch(API_ROOT + "bids/delta", {
      method: "GET",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (has(data, "delta")) {
          return data["delta"];
        } else {
          throw new Error(
            "Server responded with invalid data. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async getBiddingEnabled() {
    return fetch(API_ROOT + "bids/enabled", {
      method: "GET",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (has(data, "bidding_enabled")) {
          return data["bidding_enabled"];
        } else {
          throw new Error(
            "Server responded with invalid data. Please try again later."
          );
        }
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async setBiddingEnabled(enabled, token) {
    return fetch(
      API_ROOT + "bids/enabled",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          enabled: enabled,
        }),
      }
    )
      .then((response) => {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then((data) => {
            throw new Error(data["detail"]);
          });
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async placeBid(itemName, bid, token) {
    return fetch(API_ROOT + "bids/bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        item_name: itemName,
        bid: bid,
      }),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then((data) => {
            throw new Error(data["detail"]);
          });
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  /**
   * Create a new auction item
   * @param {string | Blob} name Item Name
   * @param {string | Blob} description Item Description
   * @param {string | Blob} bid Starting Bid
   * @param {string[]} tags Item Tags
   * @param {Blob | null} image Item Image
   * @param {string} token User Token
   */
  static async createItem(name, description, bid, tags, image, token) {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("bid", bid);
    tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    if (!isEmpty(image)) {
      formData.append("image", image);
    }

    return fetch(API_ROOT + "items/item", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then((data) => {
            throw new Error(data["detail"]);
          });
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async updateItem(name, description, bid, tags, image, token) {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("bid", bid);
    tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    if (!isEmpty(image)) {
      formData.append("image", image);
    }

    return fetch(API_ROOT + "items/item", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then((data) => {
            throw new Error(data["detail"]);
          });
        } else if (response.status >= 500) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

  static async deleteItem(itemName, token) {
    return fetch(
      API_ROOT + "items/item?" + new URLSearchParams({ item_name: itemName }),
      {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        }
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Server is unable to handle request. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error.message.toLowerCase().includes("load failed")) {
          throw new Error(
            "Unable to connect to server. Please try again later."
          );
        } else {
          throw error;
        }
      });
  }

}

export default Network;
