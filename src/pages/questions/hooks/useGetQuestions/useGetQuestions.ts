import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";
import dayjs from "dayjs";

const questions = [
  {
    question: {
      id: 1,
      name: "SOLO/GROUP",
      text: "Are you planning to travel solo or with a group?",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "free_text",
        value: null,
        hover_text: "",
        required_keys: ["is_group"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [4, 5],
      triggered_by: [],
    },
    few_shot_examples: [
      {
        response: "I am travelling alone",
        is_group: false,
        success: true,
      },
      {
        response: "I am travelling with family.",
        is_group: true,
        success: true,
      },
      {
        response: "I am travelling to Moon.",
        is_group: null,
        success: false,
      },
    ],
  },
  {
    question: {
      id: 2,
      name: "DestinationCountry",
      text: "Hey there! Are you planning a trip to a specific country or countries and need to know about the vaccines required before you go? Let me know where you're headed, and I'll do my best to help you out!",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["destination_country"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [15, 17, 18, 23, 24, 25, 26],
      triggered_by: [],
    },
    few_shot_examples: [
      {
        response: "I am travelling to USA",
        travel_country: "USA",
        success: true,
      },
    ],
  },
  {
    question: {
      id: 3,
      name: "BookingLocation",
      text: "Do you have a specific location in mind where you'd like to get vaccinated? If not, I can help you explore some options.",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["booking_location"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26],
      triggered_by: [],
    },
    few_shot_examples: [
      {
        response: "moon",
        clinic_location: null,
        success: false,
      },
    ],
  },
  {
    question: {
      id: 4,
      name: "TotalMember",
      text: "How many adults (male/female) and children (under 16) are traveling with you?",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["num_male", "num_female", "num_children"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [5],
      triggered_by: [1],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 5,
      name: "MemberDetails",
      text: "Please provide details (name, age, gender) for each group member.",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: [
          "member_name",
          "member_ages",
          "member_phone_number",
          "member_gender",
        ],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [
        7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      ],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 6,
      name: "Clinic_ID",
      text: "Select a Clinic_ID where you wish to get vaccinated.",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["clinic_id"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [7, 8],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 7,
      name: "BookingDate",
      text: "On which date are you available for your vaccination?",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "date",
        value: null,
        hover_text: "",
        required_keys: ["booking_date"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [8],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 8,
      name: "BookingTimeSlot",
      text: "Please choose a time slot for your vaccination appointment.",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "dropdown",
        value: null,
        hover_text: "",
        required_keys: ["booking_timeslot"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [9],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 9,
      name: "BookingConfirmation",
      text: "Do you want to confirm this date and time slot?",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "dropdown",
        value: null,
        hover_text: "",
        required_keys: ["is_confirm"],
      },
    },
    transitions: {
      has_trigger_condition: true,
      triggers: [7, 8, 10],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 10,
      name: "currentFeeling",
      text: "How are you feeling today?",
      is_member_question: true,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["is_good", "current_feeling"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 11,
      name: "AllergicCondition",
      text: "Do you have any allergic conditions?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_allergy", "allergies"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 12,
      name: "Vaccination/Malaria",
      text: "Have you experienced problems with vaccinations or malaria tablets?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_vaccination", "has_malaria", "vaccine_issues"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 13,
      name: "MedicalCondition",
      text: "Do you have any medical conditions we should know about?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_medical", "medical_conditions"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 14,
      name: "MedicationOverCounter",
      text: "Are you taking any medications (including over-the-counter)?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: [
          "has_medications_overcounter",
          "medications_overcounter",
        ],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 15,
      name: "Radiotherapy/Chemotherapy",
      text: "Have you ever undergone radiotherapy or chemotherapy?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_radiotherapy", "has_chemotherapy"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 16,
      name: "ImmuneTreatment",
      text: "Have you taken any treatments that impact your immune system?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_immunity_treatments", "immunity_treatments"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 17,
      name: "ThymusGland",
      text: "Do you have any thymus gland issues or have had a thymectomy?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_thymus_gland_issue", "has_thymectomy"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 18,
      name: "Spleen/Spectrum",
      text: "Have you had your sternum, spleen, or breastbone removed?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: [
          "has_sternum_removed",
          "has_spleen_removed",
          "has_breastbone_removed",
        ],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 19,
      name: "CurrentMedication",
      text: "Are you currently taking any medications?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_current_medication", "current_medication"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 20,
      name: "MedicalProcedure",
      text: "Will you need any medical procedures during your trip?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_medical_procedure", "trip_medical_procedures"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 21,
      name: "PastVaccination",
      text: "Have you received any vaccinations in the past?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_past_vaccinations", "past_vaccinations"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 22,
      name: "PregnancyPlan",
      text: "Is anyone in your group pregnant, planning pregnancy, or breastfeeding?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_pregnancy_plan", "pregnancy_status"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 23,
      name: "TraveledCountries",
      text: "Has anyone in your group visited another country in the past?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: true,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_traveled", "traveled_countries"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 24,
      name: "HIV/AIDS",
      text: "Does anyone in your group have HIV/AIDS?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_hiv/aids"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 25,
      name: "YellowFeverVaccine",
      text: "Has anyone taken the yellow fever vaccine?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_yellow_fever_vaccine"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
  {
    question: {
      id: 26,
      name: "YellowFeverRelative",
      text: "Does anyone in your group have a relative who had yellow fever?",
      is_member_question: false,
      after_completion: null,
      validation: {
        is_required: false,
        condition: {
          field: null,
          value: null,
        },
      },
      response: {
        type: "text",
        value: null,
        hover_text: "",
        required_keys: ["has_relative_yellow_fever", "relative_yellow_fever"],
      },
    },
    transitions: {
      has_trigger_condition: false,
      triggers: [],
      triggered_by: [],
    },
    few_shot_examples: [],
  },
];

function useGetQuestions() {
  const [questionData, setQuestionData] = useState<any>({
    rows: questions,
    totalPages: 1,
  });

  const { token } = useGlobalStore();

  const [date, setDate] = useState<Date | null>(null);

  const [location, setLocation] = useState<any>(null);

  const [user, setUser] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const getBooking = ({
    pageParam = 1,
    pageLimit = 20,
  }: {
    pageParam?: number;
    pageLimit?: number;
  }) => {
    const params: any = {
      limit: pageLimit,
      page: pageParam,
    };

    if (date) {
      params.date = dayjs(date).format("YYYY-MM-DD");
    }

    if (location) {
      params.location = location.children;
    }

    if (user) {
      params.user = user.value;
    }
    return client({
      endpoint: `superadmin/booking-history`,
      method: "get",
      optional: {
        token: token,
        params,
      },
    });
  };

  const { data, error, isError, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: ["bookings", { currentPage, location, date, user }],
    queryFn: () => getBooking({ pageLimit, pageParam: currentPage }),
    enabled: false,
  });

  //   useEffect(() => {
  //     if (isSuccess) {
  //       const allBookingList: any = [];

  //       setTotalPages(Math.ceil(data.data.data.total_counts / pageLimit));

  //       data.data.data.data.map((booking: any) => {
  //         return allBookingList.push(booking);
  //       });

  //       setQuestionData({
  //         rows: allBookingList,
  //         totalPages,
  //       });
  //     }
  //   }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log({ error });

      // toast.error("Unable to fetch total players of play");
    }
  }, [error, isError]);

  return {
    isSuccess,
    isLoading,
    questionData,
    error,
    isError,
    totalPages,
    data,
    isFetching,
    setCurrentPage,
    currentPage,
    setDate,
    date,
    user,
    setUser,
    location,
    setLocation,
  };
}

export { useGetQuestions };
