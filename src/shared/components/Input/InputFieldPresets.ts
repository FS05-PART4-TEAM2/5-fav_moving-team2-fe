// InputField에 들어가는 값 Preset 설정
import { RegisterOptions, UseFormGetValues } from 'react-hook-form';

// Preset 종류
export type PresetFieldName =
  | 'username'
  | 'nickname'
  | 'career'
  | 'intro'
  | 'detailDescription'
  | 'email'
  | 'phoneNumber'
  | 'password'
  | 'passwordConfirm'
  | 'reject'
  | 'estimate'
  | 'comment'
  | 'review'
  | 'currentPassword'
  | 'newPassword'
  | 'newPasswordConfirm'
  | 'quoteAmount'
  | 'quoteInfo';

type FieldPreset = {
  placeholder: string;
  type?: string;
  autoComplete?: string;
  defaultValue: string;
  rules?: RegisterOptions | ((getValues: UseFormGetValues<any>) => RegisterOptions);
};

// 로그인, 회원가입, 비밀번호 수정시 비교를 위한 함수
const validatePasswordConfirm = (value: string, getPassword: () => string): true | string => {
  return value === getPassword() || '비밀번호가 일치하지 않습니다';
};

const isSimplePassword = (password: string): boolean => {
  // 같은 문자 4개 이상 반복 → 차단
  if (/([a-zA-Z0-9!@#$%^&*()])\1{3,}/.test(password)) return true;

  // 숫자만으로 구성된 경우 → 차단
  if (/^\d+$/.test(password)) return true;

  return false;
};

export const fieldPresets: Record<PresetFieldName, FieldPreset> = {
  username: {
    placeholder: '성함을 입력해 주세요',
    type: 'text',
    autoComplete: 'name',
    defaultValue: '',
    rules: {
      required: '성함을 입력해 주세요',
      minLength: {
        value: 2,
        message: '이름은 최소 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 20,
        message: '이름은 20자 이하로 입력해주세요',
      },
      pattern: {
        value: /^[가-힣a-zA-Z]+$/,
        message: '한글 또는 영문만 입력 가능합니다',
      },
    },
  },
  nickname: {
    placeholder: '사이트에 노출될 이름을 입력해 주세요',
    type: 'text',
    autoComplete: 'name',
    defaultValue: '',
    rules: {
      required: '사이트에 노출될 이름을 입력해 주세요',
      minLength: {
        value: 2,
        message: '이름은 최소 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 20,
        message: '이름은 20자 이하로 입력해주세요',
      },
      pattern: {
        value: /^[가-힣a-zA-Z0-9 _\-!@#$%^&*()]{2,20}$/,
        message: '한글, 영문, 숫자, 공백 및 일부 특수문자만 허용됩니다',
      },
    },
  },
  career: {
    placeholder: '기사님의 경력을 입력해 주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '경력을 입력해 주세요',
      pattern: {
        value: /^[0-9]+$/,
        message: '숫자만 입력 가능합니다',
      },
      minLength: {
        value: 1,
        message: '숫자를 입력해 주세요',
      },
    },
  },
  intro: {
    placeholder: '한 줄 소개를 입력해 주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '한 줄 소개를 입력해 주세요',
      minLength: {
        value: 8,
        message: '8자 이상이어야 합니다',
      },
    },
  },
  detailDescription: {
    placeholder: '상세 설명을 입력해 주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '상세 설명을 입력해 주세요',
      minLength: {
        value: 10,
        message: '10자 이상 입력해 주세요',
      },
    },
  },
  email: {
    placeholder: '이메일을 입력해 주세요',
    type: 'email',
    autoComplete: 'email',
    defaultValue: '',
    rules: {
      required: '이메일을 입력해 주세요',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '유효한 이메일 형식이 아닙니다',
      },
    },
  },
  phoneNumber: {
    placeholder: '숫자만 입력해 주세요',
    type: 'text',
    autoComplete: 'tel',
    defaultValue: '',
    rules: {
      required: '전화번호는 필수입니다',
      pattern: {
        value: /^(01[016789]|02|0[3-6][1-5]|070)/,
        message: '유효한 전화번호 형식이 아닙니다',
      },
      validate: (value: string) => {
        const onlyDigits = value.replace(/\D/g, '');
        const prefix3 = onlyDigits.slice(0, 3);
        const prefix2 = onlyDigits.slice(0, 2);
        const onlyDigitsLimitToSeoul = onlyDigits.length !== 9 && onlyDigits.length !== 10;

        if (!/^\d+$/.test(onlyDigits)) {
          return '숫자만 입력해 주세요';
        }

        // 휴대폰 번호 (010~019)
        if (/^01[016789]$/.test(prefix3)) {
          if (![10, 11].includes(onlyDigits.length)) {
            return '휴대폰 번호는 10~11자리여야 합니다';
          }
          return true;
        }

        // 서울 (02) 총 9자리 or 10자리 고려
        if (prefix2 === '02') {
          if (onlyDigitsLimitToSeoul) {
            return '서울 지역번호(02)는 총 9자리 또는 10자리여야 합니다';
          }
          return true;
        }

        // 지역번호 (031~065)
        if (/^0[3-6][1-5]$/.test(prefix3)) {
          if (![10, 11].includes(onlyDigits.length)) {
            return '지역번호는 총 10자리 또는 11자리여야 합니다';
          }
          return true;
        }

        // 인터넷 전화 (070)
        if (prefix3 === '070') {
          if (onlyDigits.length !== 11) {
            return '인터넷 번호는 총 11자리여야 합니다';
          }
          return true;
        }

        // 위 조건 어디에도 안 걸리면
        return '유효한 전화번호 형식이 아닙니다';
      },
    },
  },
  password: {
    placeholder: '비밀번호를 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: {
      required: '비밀번호를 입력해 주세요',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/,
        message: '영문, 숫자, 특수문자를 포함해 9자 이상 입력해주세요',
      },
      validate: (value: string) => {
        if (isSimplePassword(value)) {
          return '너무 단순한 비밀번호입니다. 다른 비밀번호를 입력해 주세요';
        }
        return true;
      },
    },
  },
  passwordConfirm: {
    placeholder: '비밀번호를 다시 한번 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: (getValues) => ({
      validate: (value: string) => {
        if (!value) return true;
        return value === getValues('password') || '비밀번호가 일치하지 않습니다';
      },
      deps: ['password', 'passwordConfirm'],
    }),
  },
  reject: {
    placeholder: '최소 10자 이상 입력해주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '최소 10자 이상 입력해주세요',
      minLength: {
        value: 10,
        message: '최소 10자 이상 입력해주세요',
      },
    },
  },
  estimate: {
    placeholder: '최소 10자 이상 입력해주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '최소 10자 이상 입력해주세요',
      minLength: {
        value: 10,
        message: '최소 10자 이상 입력해주세요',
      },
    },
  },
  comment: {
    placeholder: '최소 10자 이상 입력해주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '최소 10자 이상 입력해주세요',
      minLength: {
        value: 10,
        message: '최소 10자 이상 입력해주세요',
      },
    },
  },
  review: {
    placeholder: '최소 10자 이상 입력해주세요',
    type: 'text',
    autoComplete: 'off',
    defaultValue: '',
    rules: {
      required: '최소 10자 이상 입력해주세요',
      minLength: {
        value: 10,
        message: '최소 10자 이상 입력해주세요',
      },
    },
  },
  currentPassword: {
    placeholder: '현재 비밀번호를 입력해 주세요',
    type: 'password',
    autoComplete: 'current-password',
    defaultValue: '',
    rules: (getValues) => ({
      validate: (value) => {
        const pwd = getValues('newPassword');
        if (pwd && !value) return '새 비밀번호 입력 시 현재 비밀번호는 필수입니다';
        return true;
      },
    }),
  },
  newPassword: {
    placeholder: '새 비밀번호를 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: (getValues) => ({
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/,
        message: '영문, 숫자, 특수문자를 포함해 9자 이상 입력해주세요',
      },
      validate: (value: string) => {
        if (!value) return true;
        if (isSimplePassword(value)) {
          return '너무 단순한 비밀번호입니다. 다른 비밀번호를 입력해 주세요';
        }
        if (value === getValues('currentPassword')) {
          return '현재 비밀번호와 동일한 비밀번호는 사용할 수 없습니다';
        }
        return true;
      },

      deps: ['currentPassword', 'newPassword'],
    }),
  },
  newPasswordConfirm: {
    placeholder: '새 비밀번호를 다시 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: (getValues) => ({
      validate: (value: string) => {
        if (!value) return true;
        return value === getValues('newPassword') || '새 비밀번호가 일치하지 않습니다';
      },
      deps: ['newPassword', 'newPasswordConfirm'],
    }),
  },

  quoteAmount: {
    type: 'text',
    defaultValue: '',
    placeholder: '견적가 입력',
    autoComplete: 'off',
    rules: {
      required: '견적 금액을 입력해주세요',
      pattern: {
        value: /^[0-9]+$/,
        message: '숫자만 입력해주세요',
      },
    },
  },
  quoteInfo: {
    type: 'text',
    defaultValue: '',
    placeholder: '최소 10자 이상 입력해주세요',
    autoComplete: 'off',
    rules: {
      maxLength: {
        value: 200,
        message: '200자 이하로 입력해주세요',
      },
    },
  },
};

export const presetValidators = {
  passwordConfirm: validatePasswordConfirm,
};
