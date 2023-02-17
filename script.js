var webstore = new Vue({
    el: '#app',
    data: {
        showProduct: true,
        lowHigh: 'Ascending',
        lessons: [],
        cart: [],
        searchInput: '',
        sortBy: '--Sort By--',
        order: {
            firstName: "",
            lastName: "",
            phoneNumber: ""
        }
    },
    created() {
        fetch("http://localhost:3000/collection/products")
        .then((response) => response.json())
        .then((data) => {
            this.lessons=data;
        })
    },
    methods: {
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },
        addToCart(lesson) {
            this.cart.push(lesson)
            lesson.stock -= 1
            console.log(this.cart)
        },
        checkOut() {
            let show = this.cart
            return show
        },
        removeCartItem(id) {
            let showcart = this.cart
            let less = this.lessons
            for (let i = 0; i < showcart.length; i++) {
                console.log(showcart[i].id)
                if (id == showcart[i].id) {
                    showcart.splice(i, 1)

                }
            }
            for (let i = 0; i < less.length; i++) {
                console.log(less[i].id)
                if (id == less[i].id) {
                    less[i].stock += 1

                }
            }
        },
        placeOrder: function() {
            let showcart = this.cart

            if (
                this.order.firstName &&
                this.order.lastName &&
                this.order.phoneNumber
            ) 
            {
                // this.checkout.push(this.order);
                this.order = {
                    firstName: "",
                    lastName: "",
                    phoneNumber: ""
                };
                Swal.fire(
                "Order Submitted!",
                "Your order has been submitted!",
                "success"
                );
                this.cart = [];
                // this.navigateTo("products");
            } else {
                Swal.fire(
                "Missing Fields?",
                "Please Make Sure all fields are filled out",
                "error"
                );
                this.page = "checkout";
            }
            },

            // if (this.firstName != '' && this.lastName != '' && this.phoneNumber == '' && this.cart.length == 0) {
            //     Swal.fire(
            //         'Error!',
            //         'Fill all details!',
            //         'Error'
            //     )
                
            // }
            // else{
            //     this.finalorder = {
            //         firstName: this.checkout[i].firstName,
            //         lastName: this.checkout[i].lastName,
            //         phoneNumber: this.checkout[i].phoneNumber,
            //         lessons: this.cart,
            //         // total:this.cart.reduce((acc, item) => acc + item.price, 0) + "AED"
            //     }
            //     console.log(this.finalorder)

            //     Swal.fire(
            //     'Success!',
            //     'Order submitted successfully!',
            //     'success'
            //     )
            //     // this.firstName = ''
            //     // this.lastName = ''
            //     // this.phoneNumber = ''
            //     // showcart.splice(0, showcart.length),


            // }
            
        
        cartCount(id) {
            let count = 0
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count
        },
        sortByPrice: function (priceArray) {
            function compare(a, b) {
                if (a.price > b.price)
                    return 1;
                if (a.price < b.price)
                    return -1;
                return 0;
            }
            return priceArray.sort(compare);
        },
        sortBySubject: function (subjectArray) {
            function compare(a, b) {
                if (a.subject > b.subject)
                    return 1;
                if (a.subject < b.subject)
                    return -1;
                return 0;
            }
            return subjectArray.sort(compare);
        },
        sortByLocation: function (locationArray) {
            function compare(a, b) {
                if (a.location > b.location)
                    return 1;
                if (a.location < b.location)
                    return -1;
                return 0;
            }
            return locationArray.sort(compare);
        },
        sortByAvailability: function (availabilityArray) {
            function compare(a, b) {
                if (a.stock > b.stock)
                    return 1;
                if (a.stock < b.stock)
                    return -1;
                return 0;
            }
            return availabilityArray.sort(compare);
        },

        searchLessons: function () {
            let tempLessons = this.lessons

            tempLessons = tempLessons.filter((lesson) => {
                return lesson.subject.toLowerCase().match(this.searchInput.toLowerCase()) || lesson.location.toLowerCase().match(this.searchInput.toLowerCase())
            })
            if (this.sortBy == 'price') {
                tempLessons = this.sortByPrice(tempLessons)
            }
            else if (this.sortBy == 'subject') {
                tempLessons = this.sortBySubject(tempLessons)
            }
            else if (this.sortBy == 'location') {
                tempLessons = this.sortByLocation(tempLessons)
            }
            else if (this.sortBy == 'stock') {
                tempLessons = this.sortByAvailability(tempLessons)
            }

            if (this.lowHigh == 'Ascending') {
                return tempLessons
            }
            else if (this.lowHigh == 'Descending') {
                return tempLessons.reverse()
            }
            return tempLessons
        }

    },
    computed: {
        cartItemCount: function () {
            return this.cart.length
        },
    }
});