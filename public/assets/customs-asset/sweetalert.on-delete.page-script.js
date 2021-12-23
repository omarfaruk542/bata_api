
    $(document).on('click', '.btn-edit', function(e) {
        e.preventDefault();
        let url = $(this).attr('href');

        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this record!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: url,
                        type: 'delete',
                        success: function(data) {
                            if (data == 'success') {
                                swal("Good job!", "Record deleted successfully!", "success")
                                    .then((confirmDelete) => {
                                        location.reload();
                                    });
                            }
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    })


                } else {
                    swal('Ooh!', "Your record is safe!", 'info');
                }
            });
    })

