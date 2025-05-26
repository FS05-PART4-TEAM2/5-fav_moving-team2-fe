// InputField에 들어가는 값 Preset 설정
import { RegisterOptions } from 'react-hook-form';

// Preset 종류
export type PresetFieldName =
  | 'username'
  | 'present'
  | 'intro'
  | 'description'
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
  | 'newPasswordConfirm';

type FieldPreset = {
  placeholder: string;
  type?: string;
  autoComplete?: string;
  defaultValue: string;
  rules?: RegisterOptions;
};

// 로그인, 회원가입, 비밀번호 수정시 비교를 위한 함수
const validatePasswordConfirm = (value: string, getPassword: () => string): true | string => {
  return value === getPassword() || '비밀번호가 일치하지 않습니다';
};

// 기사님 프로필에 별명에서 갑자기 이름으로 바뀜 이부분 고려해서 별명 필요시 nickname프리셋 추가
//  상세 후기, 현재 비번, 새 비번
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
  present: {
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
        value: 2,
        message: '8자 이상이어야 합니다',
      },
    },
  },
  description: {
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
        value: /^[0-9]{10,11}$/,
        message: '10~11자리 숫자만 입력해주세요',
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
        value: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/,
        message: '숫자와 특수문자를 포함해 9자 이상 입력해주세요',
      },
    },
  },
  passwordConfirm: {
    placeholder: '비밀번호를 다시 한번 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: {
      required: '비밀번호 확인이 필요합니다',
      validate: () => true,
    },
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
    rules: {
      required: '현재 비밀번호를 입력해 주세요',
    },
  },
  newPassword: {
    placeholder: '새 비밀번호를 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: {
      required: '새 비밀번호를 입력해 주세요',
      minLength: {
        value: 6,
        message: '비밀번호는 최소 6자 이상이어야 합니다',
      },
      validate: () => true,
    },
  },
  newPasswordConfirm: {
    placeholder: '새 비밀번호를 다시 입력해 주세요',
    type: 'password',
    autoComplete: 'new-password',
    defaultValue: '',
    rules: {
      required: '새 비밀번호 확인이 필요합니다',
      validate: () => true,
    },
  },
};

export const presetValidators = {
  passwordConfirm: validatePasswordConfirm,
};
