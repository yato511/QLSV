$('[data-toggle="datepicker"]').datepicker({
	format: "dd/mm/yyyy",
	date: new Date(1999, 0, 1),
	autoPick: true,
});

// $("tr:even").css("background-color", "rgb(237, 238, 243)");

async function validate(event) {
	event.preventDefault();
	const student = {
		studentId: $("#id").val(),
		name: {
			firstName: $("#firstName").val().trim(),
			lastName: $("#lastName").val().trim(),
		},
		gender: $("#male").prop("checked") ? "Nam" : "Nữ",
		address: $("#address").val().trim(),
		birthday: $("#birthday").val(),
		faculty: $("#faculty").val(),
		year: $("#year").val(),
	};

	let isValid = true;
	//Id
	// if (new RegExp(/^\d{7,8}$/).test(student.studentId)) {
	// 	$("#alert-id-format").attr("hidden", true);
	// } else {
	// 	$("#alert-id-format").removeAttr("hidden");
	// 	$("#valid-id").attr("hidden", true);
	// 	isValid = false;
	// }
	//Name
	if (student.name.firstName == 0) {
		$("#alert-name-first").removeAttr("hidden");
		$("#valid-name").attr("hidden", true);
		isValid = false;
	} else {
		$("#alert-name-first").attr("hidden", true);
		if (student.name.lastName == 0) {
			$("#alert-name-last").removeAttr("hidden");
			$("#valid-name").attr("hidden", true);
			isValid = false;
		} else {
			$("#alert-name-last").attr("hidden", true);
			$("#valid-name").removeAttr("hidden");
		}
	}
	//Birthday
	if (student.birthday == 0) {
		$("#alert-birthday").removeAttr("hidden");
		$("#valid-birthday").attr("hidden", true);
		isValid = false;
	} else {
		$("#alert-birthday").attr("hidden", true);
		$("#valid-birthday").removeAttr("hidden");
	}
	//Address
	if (student.address == 0) {
		$("#alert-address").removeAttr("hidden");
		$("#valid-address").attr("hidden", true);
		isValid = false;
	} else {
		$("#alert-address").attr("hidden", true);
		$("#valid-address").removeAttr("hidden");
	}

	// if (isValid) {
	// 	await $.ajax({
	// 		url: `/student/check`,
	// 		type: "post",
	// 		dataType: "json",
	// 		contentType: "application/json",
	// 		data: JSON.stringify({ studentId: student.studentId }),
	// 		success: function (response) {
	// 			if (response === 1) {
	// 				$("#alert-id-dup").attr("hidden", true);
	// 				$("#valid-id").removeAttr("hidden");
	// 			} else {
	// 				$("#alert-id-dup").removeAttr("hidden");
	// 				$("#valid-id").attr("hidden", true);
	// 				isValid = false;
	// 			}
	// 		},
	// 	});
	// }

	if (isValid) {
		$.ajax({
			url: `/student/create`,
			type: "post",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(student),
			success: function (response) {
				if (response === 1) {
					$("#alert-submit").attr("hidden", true);
					location.href = "/";
				} else {
					$("#alert-submit").removeAttr("hidden");
				}
			},
		});
	}
}

$("#btn-add").click(() => {
	let index = parseInt($("tbody tr th").last().text()) + 1;
	if (index < 10) index = "0" + index;
	else index = "" + index;
	const row = `<tr>
	<th scope="row">${index}</th>
	<td><input type="text" class="form-control" name="faculty" id="input-faculty" placeholder="Tên khoa"></td>
	<td colspan="5"></td>
</tr>`;
	$("tbody").append(row);
	$("#div-add").hide();
	$("#div-save").removeAttr("hidden");
});

$("#btn-cancel").click(() => {
	$("tbody tr").last().remove();
	$("#div-add").show();
	$("#div-save").attr("hidden", true);
	$(".alert").attr("hidden", true);
});

$("#btn-save").click(() => {
	const name = $("#input-faculty").val().trim();
	if (name == 0) {
		$("#alert-format").removeAttr("hidden");
		$("#alert-dup").attr("hidden", true);
		$("#alert-submit").attr("hidden", true);
	} else {
		$("#alert-format").attr("hidden", true);
		$.ajax({
			url: `/faculty/check`,
			type: "post",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({ name }),
			success: function (response) {
				if (response === 1) {
					$.ajax({
						url: `/faculty/create`,
						type: "post",
						dataType: "json",
						contentType: "application/json",
						data: JSON.stringify({ name }),
						success: function (response) {
							if (response === 1) {
								$("#alert-submit").attr("hidden", true);
								location.href = "/faculty";
							} else {
								$("#alert-submit").removeAttr("hidden");
							}
						},
					});
				} else {
					$("#alert-dup").removeAttr("hidden");
				}
			},
		});
	}
});

$(".btn-delete").click(() => {
	const index = parseInt($(event.currentTarget).attr("id"));
	const name = $(`.faculty-name:eq(${index - 1})`).text();
	$.ajax({
		url: `/faculty/delete`,
		type: "delete",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify({ name }),
		success: function (response) {
			if (response === 1) {
				$("#alert-submit").attr("hidden", true);
				location.href = "/faculty";
			} else {
				$("#alert-submit").removeAttr("hidden");
			}
		},
	});
});

$(".btn-delete-sv").click(() => {
	const index = parseInt($(event.currentTarget).attr("id"));
	const id = $(`.student-id:eq(${index})`).text();
	// console.log(id);
	$.ajax({
		url: `/student/delete`,
		type: "delete",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify({ studentId: id }),
		success: function (response) {
			if (response === 1) {
				$("#alert-delete").attr("hidden", true);
				location.href = "/student";
			} else {
				$("#alert-delete").removeAttr("hidden");
			}
		},
	});
});

function generateId() {
	const year = $("#year").val();
	const faculty = $("#faculty").val();
	$.ajax({
		type: "post",
		url: "/student/generate",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify({ year, faculty }),
		success: function (response) {
			$("#id").val(response);
		},
	});
}

$("#id").ready(() => {
	if ($("#id").length) generateId();
});
