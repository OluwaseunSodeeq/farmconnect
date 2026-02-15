class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // =========================
  // FILTERING
  // =========================
  filter() {
    const queryObj = { ...this.queryString };

    // Fileds to exclude...
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advance filtering:
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // =========================
  // SORTING
  // =========================

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
  }

  // =========================
  // FIELD LIMITING
  // =========================
  limitFields() {
    if (this.queryString.field) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  // =========================
  // PAGINATION
  // =========================
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  // =========================
  // VISIBLE DATA
  // =========================
  visibleDataaa() {}
  //   visibleData() {
  //     if (this.queryString.visible && !this.queryString.page) {
  //       const limit = parseInt(this.queryString.visible, 10) || 10;
  //       this.query = this.query.sort("-createdAt").limit(limit);
  //     }
  //     return this;
  //   }
  // ============== At the frontend, call with GET /users?visible=5 =========
  // =========GET /users?page=1&limit=20

  visibleData(defaultLimit = 5) {
    if (!this.queryString.page && !this.queryString.limit) {
      this.query = this.query.sort("-createdAt").limit(defaultLimit);
    }
    return this;
  }

  // =========================
  // SEARCH SUPPORT
  // =========================
  search(fields = []) {
    if (this.queryString.keyword) {
      const regex = new RegExp(this.queryString.keyword, "i");

      const searchQuery = fields.map((field) => ({
        [field]: regex,
      }));

      this.query = this.query.find({
        $or: searchQuery,
      });
    }

    return this;
  }
}

// Frontendcalls:
// “View All” : GET /users?page=1&limit=20
// Filter : GET /users?role=farmer&page=1&limit=10
