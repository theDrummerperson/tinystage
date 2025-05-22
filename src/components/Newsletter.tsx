{
  /* Column 3: Stay Updated (Newsletter) */
}
{
  /*
          <div
            className={cn(
              'space-y-5',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
              ),
            )}
            style={{ transitionDelay: isMounted ? '0.4s' : '0ms' }}
          >
            <h3 className='text-base font-semibold tracking-wider uppercase text-[var(--brand-gray-light)]'>
              Stay Updated
            </h3>
            <form
              className='flex items-start'
              onSubmit={handleNewsletterSubmit}
            >
              <div className='w-full'>
                <label htmlFor='footer-email' className='sr-only'>
                  Your email address
                </label>
                <div className='flex'>
                  <input
                    id='footer-email'
                    type='email'
                    name='email'
                    required
                    autoComplete='email'
                    placeholder='Your email address'
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterStatus === 'submitting'}
                    className='w-full min-w-0 flex-auto appearance-none rounded-l-md border border-r-0 border-[var(--brand-gray-dark)] bg-[var(--brand-gray-darkest)] px-3.5 py-2.5 text-sm text-[var(--brand-white)] placeholder-[var(--brand-gray-medium)] shadow-sm transition-colors duration-200 ease-out focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)] focus:ring-offset-2 focus:ring-offset-[var(--brand-black)] disabled:opacity-60'
                  />
                  <button
                    type='submit'
                    disabled={
                      newsletterStatus === 'submitting' ||
                      !newsletterEmail.trim()
                    } // Disable if submitting or email is empty
                    className='relative shrink-0 rounded-r-md border border-[var(--brand-yellow)] border-l-transparent bg-[var(--brand-yellow)] px-4 py-2.5 text-sm font-bold text-[var(--brand-black)] shadow-sm transition-all duration-200 ease-out hover:brightness-110 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)] disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {newsletterStatus === 'submitting' ? (
                      <span
                        className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                        role='status'
                      >
                        <span className='sr-only'>Submitting...</span>
                      </span>
                    ) : (
                      'Join'
                    )}
                  </button>
                </div>
                {newsletterStatus === 'success' && (
                  <p className='mt-2 text-xs text-green-400 motion-safe:animate-fadeInUp'>
                    Thanks for subscribing!
                  </p>
                )}
                {newsletterStatus === 'error' && (
                  <p className='mt-2 text-xs text-red-400 motion-safe:animate-fadeInUp'>
                    Something went wrong. Please try again.
                  </p>
                )}
                {newsletterStatus === 'idle' &&
                  !newsletterEmail && ( // Show only if idle and no email typed yet, or after success
                    <p className='mt-2 text-xs leading-normal text-[var(--brand-gray-medium)]'>
                      Latest shows, artist spotlights, community news.
                    </p>
                  )}
              </div>
            </form>
          </div>
*/
}
