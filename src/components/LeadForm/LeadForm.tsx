import { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  CheckCircle,
  Loader2,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { useLeadForm } from './useLeadForm';
import type { LeadFormProps, FieldConfig, DealershipOption } from './LeadForm.types';
import { useMotorcycles } from '../../hooks/useMotorcycles';
import type { Vehicle } from '../../types';

// ── Static Data (outside component = zero re-allocation) ──

const TEXT_FIELDS: readonly FieldConfig[] = [
  {
    field: 'nome',
    label: 'Nome Completo',
    placeholder: 'Informe seu nome',
    type: 'text',
    autoComplete: 'name',
    colSpan: 2,
  },
  {
    field: 'cpf',
    label: 'CPF',
    placeholder: '000.000.000-00',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'off',
  },
  {
    field: 'email',
    label: 'E-mail',
    placeholder: 'exemplo@email.com',
    type: 'email',
    inputMode: 'email',
    autoComplete: 'email',
  },
  {
    field: 'telefone',
    label: 'Telefone / WhatsApp',
    placeholder: '(00) 00000-0000',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'tel',
  },
  {
    field: 'cep',
    label: 'CEP',
    placeholder: '00000-000',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'postal-code',
  },
] as const;

const DEALERSHIPS: readonly DealershipOption[] = [
  { value: 'SP - Suzuki Center', label: 'São Paulo - Suzuki Center' },
  { value: 'RJ - Rio Motos', label: 'Rio de Janeiro - Rio Motos' },
  { value: 'MG - Mineira Suzuki', label: 'Belo Horizonte - Mineira Suzuki' },
  { value: 'PR - Curitiba Motos', label: 'Curitiba - Curitiba Motos' },
] as const;

// ── Sub-components (memoized) ──

const SuccessState = memo(function SuccessState({
  selectedModel,
}: {
  selectedModel?: string;
}) {
  const handleBackHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center space-y-6"
      role="alert"
      aria-live="polite"
    >
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <div>
        <h2 className="text-3xl font-display font-bold italic text-suzuki-blue">
          Interesse enviado!
        </h2>
        <p className="mt-2 text-suzuki-blue/60 font-medium">
          Entraremos em contato o mais breve possível.
          <br />
          {selectedModel ? `Sua escolha: ${selectedModel}` : ''}
        </p>
      </div>
      <button
        id="lead-form-back-home"
        onClick={handleBackHome}
        className="bg-suzuki-blue text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-suzuki-red transition-all shadow-md active:scale-95"
      >
        Voltar para Home
      </button>
    </motion.div>
  );
});

const ErrorBanner = memo(function ErrorBanner({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl"
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-bold text-red-700">Erro no envio</p>
        <p className="text-xs text-red-600 mt-1">{error}</p>
      </div>
      <button
        type="button"
        id="lead-form-retry"
        onClick={onRetry}
        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Tentar novamente
      </button>
    </motion.div>
  );
});

const ModelCard = memo(function ModelCard({ name, vehicles }: { name: string; vehicles: Vehicle[] }) {
  const vehicle = vehicles.find((v) => v.name === name);

  if (!vehicle) {
    return (
      <div className="p-4 bg-ghost-white rounded-2xl border border-suzuki-blue/10">
        <p className="text-sm font-bold text-suzuki-blue">{name}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-suzuki-blue/10 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
    >
      <div className="w-20 h-20 bg-ghost-white rounded-xl overflow-hidden flex-shrink-0 border border-suzuki-blue/5 group-hover:border-suzuki-red/20 transition-colors">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div>
        <h4 className="font-display font-bold text-suzuki-blue text-sm italic uppercase tracking-tight leading-tight">
          {vehicle.name}
        </h4>
        <p className="text-[10px] text-suzuki-blue/40 font-bold uppercase tracking-wider mt-1">
          R$ {vehicle.price.toLocaleString('pt-BR')}
        </p>
        <div className="mt-2 flex items-center gap-1.5 opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-suzuki-red animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-suzuki-blue">
            Interesse Oficial
          </span>
        </div>
      </div>
    </motion.div>
  );
});

// ── Shared Styles ──

const LABEL_CLASS =
  'text-[10px] font-black uppercase tracking-[0.15em] text-suzuki-blue/50 ml-1';

const inputClass = (hasError: boolean) =>
  `w-full bg-white border ${hasError ? 'border-suzuki-red' : 'border-suzuki-blue/10'} rounded-2xl px-6 py-4 outline-none focus:border-suzuki-red transition-colors font-medium text-suzuki-blue shadow-sm`;

const ERROR_CLASS =
  'text-[10px] text-suzuki-red font-bold uppercase tracking-wider ml-2';

// ── Main Component ──

export function LeadForm({ onSuccess, selectedModel }: LeadFormProps) {
  const {
    formData,
    errors,
    submitStatus,
    submitError,
    handleChange,
    handleSubmit,
    resetState,
  } = useLeadForm(onSuccess);

  const { vehicles } = useMotorcycles();

  const modelNames = useMemo(
    () => (selectedModel ? selectedModel.split(', ') : []),
    [selectedModel],
  );

  if (submitStatus === 'success') {
    return <SuccessState selectedModel={selectedModel} />;
  }

  return (
    <form
      id="lead-capture-form"
      onSubmit={(e) => handleSubmit(e, selectedModel)}
      className="space-y-8 bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-suzuki-blue/5 shadow-2xl"
      noValidate
    >
      {/* Error Banner */}
      <AnimatePresence>
        {submitStatus === 'error' && submitError && (
          <ErrorBanner error={submitError} onRetry={resetState} />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text / Email Fields (data-driven) */}
        {TEXT_FIELDS.map(({ field, label, placeholder, type, inputMode, autoComplete, colSpan }) => (
          <div
            key={field}
            className={`space-y-1.5${colSpan === 2 ? ' md:col-span-2' : ''}`}
          >
            <label htmlFor={`lead-field-${field}`} className={LABEL_CLASS}>
              {label} *
            </label>
            <input
              id={`lead-field-${field}`}
              type={type}
              inputMode={inputMode}
              value={formData[field] as string}
              onChange={(e) => handleChange(field, e.target.value)}
              className={inputClass(!!errors[field])}
              placeholder={placeholder}
              autoComplete={autoComplete}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? `error-${field}` : undefined}
            />
            {errors[field] && (
              <p id={`error-${field}`} className={ERROR_CLASS} role="alert">
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        {/* Concessionária (select) */}
        <div className="space-y-1.5 md:col-span-2">
          <label htmlFor="lead-field-concessionaria" className={LABEL_CLASS}>
            Concessionária mais próxima *
          </label>
          <select
            id="lead-field-concessionaria"
            value={formData.concessionaria}
            onChange={(e) => handleChange('concessionaria', e.target.value)}
            className={`${inputClass(!!errors.concessionaria)} appearance-none cursor-pointer`}
            aria-invalid={!!errors.concessionaria}
            aria-describedby={
              errors.concessionaria ? 'error-concessionaria' : undefined
            }
          >
            <option value="">Selecione uma concessionária</option>
            {DEALERSHIPS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          {errors.concessionaria && (
            <p id="error-concessionaria" className={ERROR_CLASS} role="alert">
              {errors.concessionaria}
            </p>
          )}
        </div>

        {/* Selected Models */}
        {modelNames.length > 0 && (
          <div className="md:col-span-2 space-y-4">
            <p className={LABEL_CLASS}>
              {modelNames.length > 1
                ? 'Modelos na sua Garagem'
                : 'Modelo de Interesse'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modelNames.map((name) => (
                <ModelCard key={name} name={name} vehicles={vehicles} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LGPD Consent */}
      <div className="pt-4 border-t border-suzuki-blue/5">
        <div className="flex items-start gap-4">
          <input
            id="lead-field-lgpd"
            type="checkbox"
            checked={formData.lgpdConsent}
            onChange={(e) => handleChange('lgpdConsent', e.target.checked)}
            className="mt-1 w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] rounded-sm border-2 border-suzuki-blue/20 checked:bg-suzuki-red checked:border-suzuki-red appearance-none cursor-pointer transition-all relative after:content-['✓'] after:absolute after:text-white after:text-xs after:font-bold after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100 hover:border-suzuki-red/50"
            aria-invalid={!!errors.lgpdConsent}
            aria-describedby={
              errors.lgpdConsent ? 'error-lgpd' : undefined
            }
          />
          <label htmlFor="lead-field-lgpd" className="text-xs text-suzuki-blue/50 font-medium leading-relaxed select-none">
            <ShieldCheck className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-suzuki-blue/30" />
            De acordo com a{' '}
            <span className="font-bold text-suzuki-blue">
              LGPD (Lei Geral de Proteção de Dados — Lei Nº 13.709/2018)
            </span>
            , autorizo o compartilhamento de meus dados pessoais para
            recebimento de comunicações e atendimento comercial da{' '}
            <span className="font-bold text-suzuki-blue">
              Suzuki JTZ Motors
            </span>
            . Seus dados não serão compartilhados com terceiros.
          </label>
        </div>
        {errors.lgpdConsent && (
          <p
            id="error-lgpd"
            className={`${ERROR_CLASS} mt-2`}
            role="alert"
          >
            {errors.lgpdConsent}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        id="lead-form-submit"
        type="submit"
        disabled={submitStatus === 'submitting'}
        className="w-full bg-suzuki-red text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] hover:brightness-110 hover:shadow-2xl hover:shadow-suzuki-red/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
      >
        {submitStatus === 'submitting' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Enviar Interesse{' '}
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
